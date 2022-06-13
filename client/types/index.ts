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

export interface IRelated {
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
export interface IToday extends IId {
  _source: IDetail,
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

// 스크랩 목록
export interface IScrap {
  spacing: IRelated[],
  spelling: IRelated[],
}

// 페이지네이션
export interface IPage {
  total_page: number,
  current_page: number,
}

// 문의 게시판 조회
interface IQSource {
  answer_flag: boolean,
  created_at: string,
  title?: string,
}
interface IQList extends IId {
  _source: IQSource,
  sort: number[],
}
export interface IQuestion extends IPage {
  result: IQList[],
}

// 문의게시판 글 세부 내용 조회
interface QDetailSource extends QuestionInputs {
  answer_flag: boolean,
  created_at: string,
  nickname: string,
  user_id: string,
}
export interface IQDetail extends IId {
  _source: QDetailSource
}

// 문의 게시판 글 작성
export interface QuestionInputs {
  title: string,
  question: string,
}
