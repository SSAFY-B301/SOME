import { photoUploadType } from "@/types/StateType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: photoUploadType = {
  uploadCount: 0,
  previewLength: 0,
  uploadLength: 0,
  isUploading: false,
  isPreview: false,
  files: [],
};

export const photoUploadSlice = createSlice({
  name: "photoUpload",
  initialState,
  reducers: {
    setInit(state) {
      state.uploadCount = 0;
      state.previewLength = 0;
      state.uploadLength = 0;
      state.isUploading = false;
      state.isPreview = false;
    },
    startUpload(state) {
      state.isUploading = true;
      state.uploadCount = 0;
    },
    endUpload(state) {
      state.isUploading = false;
      state.uploadCount = 0;
      state.uploadLength = 0;
    },
    startPreview(state) {
      state.isPreview = true;
    },
    endPreview(state) {
      state.isPreview = false;
    },
    countUpload(state) {
      state.uploadCount += 1;
    },
    setUploadLength(state, action) {
      state.uploadLength = action.payload.uploadLength;
    },
    setPreviewLength(state, action) {
      state.previewLength = action.payload.previewLength;
    },
    setFiles(state, action) {
      state.files = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setInit,
  startUpload,
  endUpload,
  startPreview,
  endPreview,
  countUpload,
  setUploadLength,
  setPreviewLength,
  setFiles,
} = photoUploadSlice.actions;
export default photoUploadSlice.reducer;
