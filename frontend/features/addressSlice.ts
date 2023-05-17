import { createSlice } from "@reduxjs/toolkit";

interface AddressStateType {
    address : string
}

const initialState: AddressStateType = {
  address : ""
};

export const addressSlice = createSlice({
  name: "addressState",
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
