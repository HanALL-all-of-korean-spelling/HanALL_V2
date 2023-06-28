import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

export const useGetScraps = () => {
  const { data } = useQuery([KEYS.SCRAPS], () => api.get('/scraps'));
  return { scraps: data?.data };
};

export const useGetTests = () => {
  const { data } = useQuery([KEYS.SCRAPS_TEST], () => api.get('/scraps/test'));
  return { tests: data?.data };
};
