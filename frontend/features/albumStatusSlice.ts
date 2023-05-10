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
      console.log("INIT");

      state.albumId = 0;
      state.categoryId = 0;
      state.userId = new Set<number>();
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
    clearUserIdState(state, action) {
      state.userId.clear();
      state.userId = state.userId;
    },
    deleteUserIdState(state, action) {
      console.log("DELETE");
      console.log(action.payload);

      state.userId.delete(action.payload);
      console.log(state.userId);

      state.userId = state.userId;
    },
    addUserIdState(state, action) {
      console.log("ADD");
      console.log(action.payload);
      state.userId.add(action.payload);
      state.userId = state.userId;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setALbumIdState,
  setCategoryState,
  setUserIdState,
  setInit,
  clearUserIdState,
  deleteUserIdState,
  addUserIdState,
} = albumStatusSlice.actions;
export default albumStatusSlice.reducer;
