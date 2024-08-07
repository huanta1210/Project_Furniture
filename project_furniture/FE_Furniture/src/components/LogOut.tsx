import { useContext } from "react";
import { AuthContext } from "../store/contexts/AuthContext";

const LogOut = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <button onClick={logOut} type="button">
      <i className="fa-solid fa-arrow-right-from-bracket text-red-500 mr-2"></i>
      Log Out
    </button>
  );
};

export default LogOut;
