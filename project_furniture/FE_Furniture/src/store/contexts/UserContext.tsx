import { createContext, useEffect, useReducer } from "react";
import { User } from "../../interfaces/User";
import userReducer from "../reducers/userReducer";
import { toast } from "react-toastify";
import instance from "../../api";
import { ChildrenProps } from "../../interfaces/Children";

type UserContext = {
  state: {
    users: User[];
  };
};

export const UserContext = createContext<UserContext>({} as UserContext);
export const UserProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(userReducer, { users: [] });

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get("auth/get-auth");
        if (!res) {
          toast.error("Get Auth Failed");
        } else {
          dispatch({ type: "GET_USER", payload: res.data.datas });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error Api");
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={{ state }}>{children}</UserContext.Provider>
  );
};
