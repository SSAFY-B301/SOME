import { createSlice } from "@reduxjs/toolkit";
import { PhotoListType } from "@/types/StateType";

const initialState: PhotoListType = {
  albumId: 0,
  categoryId: 0,
  userId: new Set(),
};

export const photoListSlice = createSlice({
  name: "photoList",
  initialState,
  reducers: {
    setInit(state) {
      state.albumId = 0;
      state.categoryId = 0;
      state.userId = new Set();
    },
    setALbumIdState(state, action) {
      state.albumId = action.payload.albumId;
    },
    setCategoryState(state, action) {
      state.categoryId = action.payload.categoryId;
    },
    setUserIdState(state, action) {
      state.userId = action.payload.userId;
    },
  },
  extraReducers: (builder) => {},
});

export const { setALbumIdState, setCategoryState, setUserIdState, setInit } =
  photoListSlice.actions;
export default photoListSlice.reducer;
