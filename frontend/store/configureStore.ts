import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import rootReducer from "./reducer";

const isDev = process.env.NODE_ENV === "development";
const makeStore = () => {
  const middleware = getDefaultMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    /* custom middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(사용자 정의)  */
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(makeStore);

/*
      아래는 wrapper로 스토어를 생성하고 클라이언트에서 사용할 typeScript용 
      dispatch와 state 및 asynchronous dispatch의 타입 작성 코드이다.
  */
type AppStore = ReturnType<typeof makeStore>;
type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export default wrapper;
