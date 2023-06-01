import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

export const useGetAnswer = ({ answerId }: { answerId: number }) => {
  const { data } = useQuery([KEYS.ANSWERS, answerId], () =>
    api.get('/answers/' + answerId),
  );
  return { answer: data?.data };
};
