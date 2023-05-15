import { createSlice } from "@reduxjs/toolkit";
import { GirlListDetailStateType } from "@/types/StateType";

const initialState : GirlListDetailStateType= {
    section : 5,
    latitude : -1,
    longitude : -1,
    page : 0,
    size : 12,
    order : "like"
};

export const girlListDetailStateSlice = createSlice({
  name: "girlListDetailState",
  initialState,
  reducers: {
    girListDetailInit(state){
      state.section = 5,
      state.latitude = -1,
      state.longitude = -1,
      state.page = 0,
      state.size = 12,
      state.order = "like"
    },
    setGirlListDetailState(state, action) {
      state.section = action.payload.section,
      state.latitude = action.payload.latitude,
      state.longitude = action.payload.longitude,
      state.page = action.payload.page,
      state.size = action.payload.size,
      state.order = action.payload.order
    },
    setOrder(state, action){
      state.order = action.payload.order
    }
  },
  extraReducers: (builder) => {},
});

export const { girListDetailInit, setGirlListDetailState } = girlListDetailStateSlice.actions;
export default girlListDetailStateSlice.reducer;
