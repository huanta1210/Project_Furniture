import { useNavigate } from "react-router";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button onClick={handleLogOut} type="button">
      <i className="p-px text-xl fa-solid text-slate-700 fa-arrow-right-from-bracket"></i>
    </button>
  );
};

export default LogOut;
