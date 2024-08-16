import { State, Action } from "../../interfaces/User";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: any = jwtDecode(token);
    const expiresAt = decodedToken.exp * 1000;
    return Date.now() > expiresAt;
  } catch (error) {
    return true;
  }
};

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
    case "CHECK_TOKEN": {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return { ...userState, token: null, users: null };
      }
      return userState;
    }
    default:
      return userState;
  }
};

export default authReducer;
