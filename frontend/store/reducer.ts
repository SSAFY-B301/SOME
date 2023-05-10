import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import authSlice from "../features/authSlice";
import albumStatusSlice from "@/features/albumStatusSlice";
import photoUploadSlice from "@/features/photoUploadSlice";

const combinedReducer = combineReducers({
  auth: authSlice,
  albumStatus: albumStatusSlice,
  photoUpload: photoUploadSlice,
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
