import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { JoinInputs } from '@/constants/types/users';
import { api } from '../apiClient';

export const useJoin = () => {
  const joinMutation = useCallback((inputs: JoinInputs) => {
    return api.post('/users', inputs);
  }, []);

  const { mutate } = useMutation(joinMutation);
  return { join: mutate };
};

export const useUpdateTestResult = () => {
  const updateTestResultMutation = useCallback(
    ({ plusPoint }: { plusPoint: number }) => {
      return api.patch('/users/point', { plusPoint });
    },
    [],
  );

  const { mutate } = useMutation(updateTestResultMutation);
  return { updateTestResult: mutate };
};
