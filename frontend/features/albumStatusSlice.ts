import { createSlice } from "@reduxjs/toolkit";
import { AlbumStatusType } from "@/types/StateType";

const initialState: AlbumStatusType = {
  albumId: 0,
  categoryId: 0,
  userId: new Set(),
};

export const albumStatusSlice = createSlice({
  name: "albumStatus",
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
  albumStatusSlice.actions;
export default albumStatusSlice.reducer;
