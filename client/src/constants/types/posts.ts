export const enum PostTypeEnum {
  SPELLING = 'spelling',
  SPACING = 'spacing',
}

export const enum PostSortEnum {
  CREATED_AT = 'createdAt',
  HITS = 'hits',
  SCRAPS = 'scraps',
}

export interface PostDataType {
  id?: number;
  title: string;
  type?: PostTypeEnum;
  content?: string;
  hitCount: number;
  scrapCount: number;
  createTime: Date;
}
