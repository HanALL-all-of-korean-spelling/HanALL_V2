import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionInputs } from '@/constants/types/questions';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

interface QuestionMutationPropType {
  questionId: number;
  inputs?: QuestionInputs;
}

export const useCreateQuestion = () => {
  const createQuestionMutation = useCallback((inputs: QuestionInputs) => {
    return api.post('/questions', inputs);
  }, []);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(createQuestionMutation, {
    // ? 질문 목록은 최신순 정렬되기 때문에 1페이지의 캐시만 재요청
    onSuccess: () => queryClient.invalidateQueries([KEYS.QUESTIONS, 1]),
  });
  return { createQuestion: mutate };
};

export const useUpdateQuestion = () => {
  const updateQuestionMutation = useCallback(
    ({ questionId, inputs }: QuestionMutationPropType) => {
      return api.patch('/questions/' + questionId, inputs);
    },
    [],
  );

  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateQuestionMutation, {
    onSuccess: () => queryClient.invalidateQueries([KEYS.QUESTIONS, 1]),
  });
  return { updateQuestion: mutate };
};

export const useDeleteQuestion = () => {
  const deleteQuestionMutation = useCallback(
    ({ questionId }: QuestionMutationPropType) => {
      return api.delete('/questions/' + questionId);
    },
    [],
  );

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteQuestionMutation, {
    onSuccess: () => queryClient.invalidateQueries([KEYS.QUESTIONS]),
  });
  return { deleteQuestion: mutate };
};
