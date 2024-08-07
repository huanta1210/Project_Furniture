import { createContext, useReducer } from "react";
import { ChildrenProps } from "../../interfaces/Children";
import authReducer from "../reducers/authReducer";
import { JWTDecode, State, User } from "../../interfaces/User";
import instance from "../../api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

type AuthContext = {
  userState: State;
  loginCustom: (data: User) => void;
  LoginPlatform: () => void;
  logOut: () => void;
};

const initialState: State = {
  token: localStorage.getItem("token") || null,
  users: JSON.parse(localStorage.getItem("user") || "null"),
};
export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [userState, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const loginCustom = async (dataLogin: User) => {
    try {
      const { data } = await instance.post("/auth/login", dataLogin);

      if (!data) {
        toast.error("The data returned failed");
      } else {
        dispatch({
          type: "SET_AUTH",
          payload: {
            token: data.accessToken,
            users: data.user,
          },
        });
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Login to unsuccessful");
    }
  };

  const LoginPlatform = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      const decode: JWTDecode = jwtDecode(token);
      dispatch({ type: "SET_AUTH", payload: { token: token, users: decode } });
      const role = decode.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  };
  const logOut = () => {
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ userState, loginCustom, LoginPlatform, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
