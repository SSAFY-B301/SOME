import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import authSlice from "../features/authSlice";
import albumStatusSlice from "@/features/albumStatusSlice";
import photoUploadSlice from "@/features/photoUploadSlice";
import locationSlice from "@/features/locationSlice";
import girlListDetailStateSlice from "@/features/girlListDetailSlice";
import userAgentSlice from "@/features/userAgentSlice";

const combinedReducer = combineReducers({
  auth: authSlice,
  location: locationSlice,
  girlListDetailState: girlListDetailStateSlice,
  albumStatus: albumStatusSlice,
  photoUpload: photoUploadSlice,
  userAgent: userAgentSlice,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;
