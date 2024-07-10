import { combineReducers, Reducer } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, PersistConfig } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import authReducer from "../actions/Action";
import { AuthAction, AuthState } from "../../interfaces/Auth";

// Cấu hình persist chung
const commonConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["isLoggedIn", "token"],
};

// rootReducer với combineReducers và persistReducer
const rootReducer: Reducer<{ auth: AuthState }, AuthAction> = combineReducers({
  auth: persistReducer(commonConfig, authReducer),
});

export default rootReducer;
