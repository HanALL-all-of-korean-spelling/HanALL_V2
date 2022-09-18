import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../_app/store";

export interface TestState {
  score: number;
  page: number;
}

const initialState: TestState = {
  score: 0,
  page: 1,
};

export const TestSlice = createSlice({
  name: "testReducer",
  initialState,
  reducers: {
    setTotalScore: (state, action) => {
      state.score = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setTotalScore, setPage } = TestSlice.actions;

export const getTest = (state: RootState) => state.test;

export default TestSlice.reducer;
