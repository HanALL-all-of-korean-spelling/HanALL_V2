interface ISource {
  title: string,
  hits: number,
  scraps?: number,
  created_at?: string,
}

interface IId {
  _index: string,
  _type: string,
  _id: string,
  _score?: number,
}

// 리스트
export interface IList extends IId {
  _source: ISource,
  sort: number[],
}

// 메인 리스트
export interface IMainList {
  hits_order: IList[],
  created_at_order: IList[],
}

interface IRelated {
  id: string,
  title: string,
}

// 디테일
export interface IDetail extends ISource {
  type: string,
  right_words: string,
  wrong_words: string[],
  description: string,
  helpful_info: string,
  related?: IRelated,
}

// 오늘의 맞춤법
export interface IToday extends IDetail {
  _id: string,
}

// 검색 세부 결과
interface ISearchContent extends IId {
  _source: IDetail,
}

// 검색 결과
export interface ISearch {
  detail: ISearchContent,
  similar: ISearchContent[],
  flag: boolean,
}
