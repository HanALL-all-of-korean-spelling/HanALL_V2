import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnswerInputs } from '@/constants/types/answers';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

interface AnswerMutationPropType {
  answerId: number;
  content?: string;
}

export const useCreateAnswer = () => {
  const createAnswerMutation = useCallback((inputs: AnswerInputs) => {
    return api.post('/answers', inputs);
  }, []);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(createAnswerMutation, {
    // TODO: backend update시 response로 questionID 받아서 캐시 업데이트
    onSuccess: () => queryClient.invalidateQueries([KEYS.ANSWERS]),
  });
  return { createAnswer: mutate };
};

export const useUpdateAnswer = () => {
  const updateAnswerMutation = useCallback(
    ({ answerId, content }: AnswerMutationPropType) => {
      return api.patch('/answers/' + answerId, { content });
    },
    [],
  );

  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateAnswerMutation, {
    onSuccess: () => queryClient.invalidateQueries([KEYS.ANSWERS]),
  });
  return { updateAnswer: mutate };
};

export const useDeleteAnswer = () => {
  const deleteAnswerMutation = useCallback(
    ({ answerId }: AnswerMutationPropType) => {
      return api.delete('/answers/' + answerId);
    },
    [],
  );

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteAnswerMutation, {
    onSuccess: () => queryClient.invalidateQueries([KEYS.QUESTIONS]),
  });
  return { deleteAnswer: mutate };
};
