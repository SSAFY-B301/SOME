import { createSlice } from "@reduxjs/toolkit";
import type {UserInfoType} from "@/types/UserType";


interface LoginStateType{
  isLogin: boolean,
  userInfo : UserInfoType
}

const initialState: LoginStateType = {
  isLogin: false,
  userInfo : {
    accessToken: "",
    refreshToken: "",
    userId : "",
    userImg: "",
    userName: "",
  },
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin(state, action){
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    onLogout(state){
      state.isLogin = false;
      state.userInfo = {
        accessToken: "",
        refreshToken: "",
        userId : "",
        userImg: "",
        userName: "",
      };
    }
  },
  extraReducers: (builder) => {}
});

export const { onLogin, onLogout } = loginSlice.actions;
export default loginSlice.reducer;