import { PostContainer } from '@/components/organisms/containers/PostContainer';
import {
  PostDataType,
  PostTypeEnum,
  PostTypeTextMap,
} from '@/constants/types/posts';
import style from './postListTemplate.module.scss';

interface PostListPropType {
  posts?: PostDataType[];
  postType: PostTypeEnum;
  postTotalCount?: number;
}

export const PostListTemplate = ({
  posts,
  postType,
  postTotalCount,
}: PostListPropType) => {
  return (
    <>
      <div className={style['flex-line']}>
        <div>
          {postTotalCount ?? 0} 개의 {PostTypeTextMap[postType]} 정보
        </div>
        <div className={style['go-to-button']}>맞춤법 정보 보러 가기</div>
      </div>
      <div className={style['filter-button-container']}>
        <div>조회수순</div>
        <div>스크랩순</div>
        <div>최신순</div>
      </div>
      {posts?.map((post) => (
        <PostContainer key={post.id} {...post} postType={postType} />
      ))}
    </>
  );
};
