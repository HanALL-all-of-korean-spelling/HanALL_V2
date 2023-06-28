import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

export const useGetQuestions = ({ page }: { page: number }) => {
  const { data } = useQuery([KEYS.QUESTIONS, page], () =>
    api.get('/questions?page=' + page),
  );
  return { questions: data?.data };
};
