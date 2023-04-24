import { createSlice } from "@reduxjs/toolkit";

interface LoginState{
  isLogin: boolean,
  nickname: string,
  accessToken: string,
  refreshToken: string,
  profileImg: string,
}

const initialState: LoginState = {
  isLogin: false,
  nickname: "",
  accessToken: "",
  refreshToken: "",
  profileImg: "/images/profileImg.png"
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {}
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;