import { AuthState, AuthAction } from "../../interfaces/Auth";
import { Reducer } from "redux";
const initState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
