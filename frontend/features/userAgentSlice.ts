import { createSlice } from "@reduxjs/toolkit";
import { UserAgentType } from "@/types/StateType";

const initialState: UserAgentType = {
  userAgent: "",
};

export const userAgentSlice = createSlice({
  name: "userAgent",
  initialState,
  reducers: {
    setInit(state) {
      state.userAgent = "";
    },
    setUserAgent(state, action) {
      console.log(action.payload);

      state.userAgent = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setInit, setUserAgent } = userAgentSlice.actions;
export default userAgentSlice.reducer;
