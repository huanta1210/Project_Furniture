import { Navigate, Outlet } from "react-router";

const PrivateRouter = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRouter;
