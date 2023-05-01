import { createSlice } from "@reduxjs/toolkit";
import type { UserInfoType } from "@/types/UserType";

interface LoginStateType {
  isLogin: boolean;
  userInfo: UserInfoType;
}

const initialState: LoginStateType = {
  isLogin: false,
  userInfo: {
    access_token: "",
    refresh_token: "",
    user_id: "",
    user_img: "",
    user_name: "",
  },
};

export const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin(state, action) {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    onLogout(state) {
      state.isLogin = false;
      state.userInfo = {
        access_token: "",
        refresh_token: "",
        user_id: "",
        user_img: "",
        user_name: "",
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { onLogin, onLogout } = loginSlice.actions;
export default loginSlice.reducer;
