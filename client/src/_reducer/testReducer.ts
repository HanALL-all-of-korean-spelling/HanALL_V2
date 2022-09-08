import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../_app/store";

export interface TestState {
  score: number;
}

const initialState: TestState = {
  score: 0,
};

export const TestSlice = createSlice({
  name: "testReducer",
  initialState,
  reducers: {
    setTotalScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { setTotalScore } = TestSlice.actions;

export const getTest = (state: RootState) => state.test;

export default TestSlice.reducer;
