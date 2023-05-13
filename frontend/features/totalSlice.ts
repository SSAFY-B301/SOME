import { createSlice } from "@reduxjs/toolkit";
import { TotalStateType } from "@/types/StateType";

const initialState: TotalStateType = {
  isTotal: false,
  isMove: false,
  moveEnd: false,
};

export const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    setInit(state) {
      state.isTotal = false;
      state.isMove = false;
      state.moveEnd = false;
    },
    setIsTotal(state, action) {
      state.isTotal = action.payload;
    },
    setIsMove(state, action) {
      state.isMove = action.payload;
    },
    setMoveEnd(state, action) {
      state.moveEnd = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setInit, setIsTotal, setIsMove, setMoveEnd } =
  totalSlice.actions;
export default totalSlice.reducer;
