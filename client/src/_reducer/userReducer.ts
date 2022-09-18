import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../_app/store";
import { IUser } from "../../types/auth";

export interface UserState {
  user: IUser | undefined;
  isAdmin: ConstrainBoolean;
}

const initialState: UserState = {
  user: undefined,
  isAdmin: false,
};

export const UserSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (state.user?.email == "matji1349@gmail.com") {
        state.isAdmin = true;
      }
    },
    setUserScore: (state, action) => {
      if (state.user != undefined) {
        state.user.point += action.payload;
      }
    },
  },
});

export const { setUser, setUserScore } = UserSlice.actions;

export const getUser = (state: RootState) => state.user;

export default UserSlice.reducer;
