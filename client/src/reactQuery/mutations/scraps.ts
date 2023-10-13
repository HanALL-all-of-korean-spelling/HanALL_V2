import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

export const useScrapPost = () => {
  const scrapPostMutation = useCallback(({ postId }: { postId: number }) => {
    return api.post('/scraps/' + postId);
  }, []);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(scrapPostMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries([KEYS.SCRAPS]);
      queryClient.invalidateQueries([KEYS.SCRAPS_TEST]);
    },
  });
  return { scrapPost: mutate };
};

export const useDeleteScrap = () => {
  const deleteScrapMutation = useCallback(({ postId }: { postId: number }) => {
    return api.delete('/scraps/' + postId);
  }, []);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteScrapMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries([KEYS.SCRAPS]);
      queryClient.invalidateQueries([KEYS.SCRAPS_TEST]);
    },
  });
  return { deleteScrap: mutate };
};
