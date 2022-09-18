import { createSlice } from "@reduxjs/toolkit";
import { IQnaDetail, IQuestion } from "../../types";
import { RootState } from "../_app/store";

export interface QnaState {
  qnaList: IQuestion;
  qnaDetail: IQnaDetail;
}

const initialState: QnaState = {
  qnaList: {
    result: [],
    total_page: 0,
    current_page: 0,
  },
  qnaDetail: {
    question: {
      _id: "",
      _index: "",
      _score: 0,
      _type: "",
      _source: {
        answer_flag: false,
        created_at: "",
        nickname: "",
        user_id: "",
        title: "",
        question: "",
      },
    },
    answer: undefined,
  },
};

export const QnaSlice = createSlice({
  name: "qnaReducer",
  initialState,
  reducers: {
    setQnaList: (state, action) => {
      state.qnaList = action.payload;
    },
    setQnaDetail: (state, action) => {
      state.qnaDetail = action.payload;
    },
  },
});

export const { setQnaList, setQnaDetail } = QnaSlice.actions;

export const getQna = (state: RootState) => state.qna;
export const getQnaList = (state: RootState) => state.qna.qnaList;
export const getQnaDetail = (state: RootState) => state.qna.qnaDetail;

export default QnaSlice.reducer;
