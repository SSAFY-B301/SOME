import { createSlice } from "@reduxjs/toolkit";
import { AlbumStatusType } from "@/types/StateType";

const initialState: AlbumStatusType = {
  albumId: 0,
  categoryId: 0,
  userId: [],
};

export const albumStatusSlice = createSlice({
  name: "albumStatus",
  initialState,
  reducers: {
    setInit(state) {
      state.albumId = 0;
      state.categoryId = 0;
      state.userId = [];
    },
    setALbumIdState(state, action) {
      state.albumId = action.payload.albumId;
    },
    setCategoryState(state, action) {
      state.categoryId = action.payload.categoryId;
    },
    setUserIdState(state, action) {
      state.userId = action.payload;
    },
    addUserIdState(state, action) {
      state.userId.push(action.payload);
    },
    setToArrayUserId(state, action) {
      state.userId = Array.from(action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setInit,
  setALbumIdState,
  setCategoryState,
  setUserIdState,
  addUserIdState,
  setToArrayUserId,
} = albumStatusSlice.actions;
export default albumStatusSlice.reducer;
