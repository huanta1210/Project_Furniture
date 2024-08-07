import { State, Action } from "../../interfaces/User";

const authReducer = (userState: State, action: Action) => {
  switch (action.type) {
    case "SET_AUTH": {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.users));
      return {
        ...userState,
        token: action.payload.token,
        users: action.payload.users,
      };
    }
    case "LOG_OUT": {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...userState, token: null, users: null };
    }
    default:
      return userState;
  }
};

export default authReducer;
