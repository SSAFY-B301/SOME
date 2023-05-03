import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import authSlice from "../features/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const combinedReducer = combineReducers({
  auth: authSlice,
});

const persistConfig = {
  key : "root",
  storage,
  whitelist : ["auth"]
}

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

export default persistReducer(persistConfig, rootReducer);
