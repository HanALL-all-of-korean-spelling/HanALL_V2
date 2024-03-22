import { PostDataType, PostTypeEnum } from '@/constants/types/posts';
import style from './postContainer.module.scss';

export const PostContainer = ({
  id,
  title,
  type,
  content,
  hitCount,
  scrapCount,
  createTime,
}: PostDataType) => {
  const typeText = type === PostTypeEnum.SPACING ? '띄어쓰기' : '철자';

  return (
    <div className={style['container']} key={id}>
      <div className={style['title-line']}>
        <div>{title}</div>
        <div className={style['word-type-wrapper']}>{typeText}</div>
      </div>
      <div className={style['content-wrapper']}>{content}내용</div>
      <div className={style['info-line']}>
        <div>{`${createTime}`}</div>
        <div className={style['icon-text-wrapper']}>
          <div className={style['icon-with-text']}>
            <img src="https://dummyimage.com/18x18.png" alt="hit" />
            <div>{hitCount}</div>
          </div>
          <div className={style['icon-with-text']}>
            <img src="https://dummyimage.com/18x18.png" alt="hit" />
            <div>{scrapCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
