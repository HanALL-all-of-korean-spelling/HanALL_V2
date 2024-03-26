export const enum PostTypeEnum {
  SPELLING = 'spelling',
  SPACING = 'spacing',
}

export const PostTypeTextMap: Record<PostTypeEnum, string> = {
  spelling: '철자',
  spacing: '띄어쓰기',
};

export const enum PostSortEnum {
  CREATED_AT = 'createdAt',
  HITS = 'hits',
  SCRAPS = 'scraps',
}

export interface PostDataType {
  id?: number;
  title: string;
  postType: PostTypeEnum;
  content?: string;
  hitCount: number;
  scrapCount: number;
  createTime: Date;
}
