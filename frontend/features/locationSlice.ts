import { createSlice } from "@reduxjs/toolkit";
import { locationStateType } from "@/types/StateType";

const initialState: locationStateType = {
  lat: 36.356096,
  lng: 127.3004032,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    changeLocation(state, action) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
  extraReducers: (builder) => {},
});

export const { changeLocation} = locationSlice.actions;
export default locationSlice.reducer;
