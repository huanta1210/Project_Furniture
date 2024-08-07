import { useContext } from "react";
import { AuthContext } from "../../store/contexts/AuthContext";

const LoginPlatform = () => {
  const { LoginPlatform } = useContext(AuthContext);

  LoginPlatform();
  return (
    <>
      <h1>Huấn</h1>
    </>
  );
};

export default LoginPlatform;
