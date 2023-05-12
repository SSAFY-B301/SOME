import { createSlice } from "@reduxjs/toolkit";
import { HomeType } from "@/types/StateType";

const initialState: HomeType = {
  isCurrentStory: false,
  CurrentAlbumId: 0,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setInit(state) {
      state.isCurrentStory = false;
      state.CurrentAlbumId = 0;
    },
    setCurrentAlbumId(state, action) {
      state.CurrentAlbumId = action.payload;
    },
    startCurrentStory(state) {
      state.isCurrentStory = true;
    },
    endCurrentStory(state) {
      state.isCurrentStory = false;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setInit,
  setCurrentAlbumId,
  startCurrentStory,
  endCurrentStory,
} = homeSlice.actions;
export default homeSlice.reducer;
