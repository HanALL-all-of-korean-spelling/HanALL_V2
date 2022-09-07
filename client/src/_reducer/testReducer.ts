import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../_app/store";

export interface TestState {}

const initialState: TestState = {};

export const TestSlice = createSlice({
  name: "testReducer",
  initialState,
  reducers: {},
});

// export const {} = TestSlice.actions;

export const getTest = (state: RootState) => state.test;

export default TestSlice.reducer;
