import { AuthAction, AuthState } from "../../interfaces/Auth";
const initState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authReducer = (state: AuthState = initState, action: AuthAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
