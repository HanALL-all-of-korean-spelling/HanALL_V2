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
    addQuestion: (state, action) => {
      const today = new Date();
      state.qnaList.result.unshift({
        _source: {
          title: action.payload,
          answer_flag: false,
          created_at: today.toJSON(),
        },
        sort: [1],
        _index: "question",
        _id: "1",
        _type: "_doc",
      });
    },
    editQuestion: (state, action) => {
      const findItem = state.qnaList.result.find(
        (question) => question._id === action.payload.id
      );
      if (findItem) {
        findItem._source.title = action.payload.title;
      }
      state.qnaDetail.question._source.title = action.payload.title;
      state.qnaDetail.question._source.question = action.payload.question;
    },
    deleteQuestion: (state, action) => {
      state.qnaList.result = state.qnaList.result.filter(
        (question) => question._id !== action.payload
      );
    },
    addAnswer: (state, action) => {
      const findItem = state.qnaList.result.find(
        (question) => question._id === action.payload.id
      );
      if (findItem) {
        findItem._source.answer_flag = true;
      }
      state.qnaDetail.answer = {
        _source: {
          answer: action.payload.answer,
          question_id: "1",
        },
        _index: "answers",
        _id: "1",
        _type: "_doc",
      };
    },
  },
});

export const {
  setQnaList,
  setQnaDetail,
  addQuestion,
  editQuestion,
  deleteQuestion,
  addAnswer,
} = QnaSlice.actions;

export const getQna = (state: RootState) => state.qna;
export const getQnaList = (state: RootState) => state.qna.qnaList;
export const getQnaDetail = (state: RootState) => state.qna.qnaDetail;

export default QnaSlice.reducer;
