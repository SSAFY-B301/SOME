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
      console.log("INIT");
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
      console.log("SET");

      console.log(action.payload);

      state.userId = action.payload;
    },
    addUserIdState(state, action) {
      console.log("ADD");
      state.userId.push(action.payload);
    },
    setToArrayUserId(state, action) {
      console.log("TO ARRAY");

      console.log(action.payload);

      state.userId = Array.from(action.payload);
      console.log(state.userId);
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
