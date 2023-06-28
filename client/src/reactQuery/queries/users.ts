import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

export const useGetUserInfo = () => {
  const { data } = useQuery([KEYS.USER_INFO], () => api.get('/users'));
  return { userInfo: data?.data };
};
