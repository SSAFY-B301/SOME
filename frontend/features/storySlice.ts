import { createSlice } from "@reduxjs/toolkit";
import { StoryType } from "@/types/StateType";

const initialState: StoryType = {
  isCurrentStory: false,
  currentAlbumId: 0,
  albumIndex: 0,
  notiIds: [],
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setInit(state) {
      state.isCurrentStory = false;
      state.currentAlbumId = 0;
      state.albumIndex = 0;
      state.notiIds = [];
    },
    setCurrentAlbumId(state, action) {
      state.currentAlbumId = action.payload;
    },
    startCurrentStory(state) {
      state.isCurrentStory = true;
    },
    endCurrentStory(state) {
      state.isCurrentStory = false;
    },
    addNotiIds(state, action) {
      state.notiIds.push(action.payload);
    },
    setAlbumIndex(state, action) {
      state.albumIndex = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setInit,
  setCurrentAlbumId,
  startCurrentStory,
  endCurrentStory,
  addNotiIds,
  setAlbumIndex,
} = storySlice.actions;
export default storySlice.reducer;
