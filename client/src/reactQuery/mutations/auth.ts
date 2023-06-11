import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LoginInputs } from '@/constants/types/auth';
import { api } from '../apiClient';

export const useLogin = () => {
  const loginMutation = useCallback((inputs: LoginInputs) => {
    return api.post('/auth/login', inputs);
  }, []);

  const { mutate, data } = useMutation(loginMutation, {
    onSuccess: (response) => {
      // TODO: refresh token
      const token = response.data.accesstoken;
      api.defaults.headers.common['accesstoken'] = token;
    },
  });
  return { login: mutate, loginResult: data?.data };
};
