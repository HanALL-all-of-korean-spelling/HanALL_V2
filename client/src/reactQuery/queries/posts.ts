import { PostSortEnum, PostTypeEnum } from '@/constants/types/posts';
import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import { KEYS } from '../queryKeys';

interface GetPostsPropType {
  postType: PostTypeEnum;
  sort: PostSortEnum;
  page: number;
}

export const useGetPosts = ({ postType, sort, page }: GetPostsPropType) => {
  const { data } = useQuery([KEYS.POSTS, postType, sort, page], () =>
    api.get('/posts?type=' + postType + '&sort=' + sort + '&page=' + page),
  );
  return { posts: data?.data };
};

export const useGetTodayInfo = () => {
  const { data } = useQuery([KEYS.POST_TODAY], () => api.get('/posts/today'));
  return { today: data?.data };
};

export const useGetPostDetail = ({ postId }: { postId: number }) => {
  const { data } = useQuery([KEYS.POST_DETAIL, postId], () =>
    api.get('/posts/' + postId),
  );
  return { detail: data?.data };
};
