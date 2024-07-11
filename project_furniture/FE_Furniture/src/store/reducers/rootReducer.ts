import authReducer from "./authReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const authConfig = {
  key: "auth",
  storage,
  stateReconsiler: autoMergeLevel2,
  whilelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
});

export default rootReducer;
