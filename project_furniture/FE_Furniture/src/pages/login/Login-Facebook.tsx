// import { useLocation, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// interface JWTDecode {
//   id: string | number;
//   role: string;
//   iat: number;
//   exp: number;
// }

// const LoginFacebook = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = new URLSearchParams(location.search).get("token");
//   if (token) {
//     localStorage.setItem("token", token);
//     const decode: JWTDecode = jwtDecode(token);
//     const role = decode.role;

//     if (role !== "admin") {
//       navigate("/products");
//     }
//   }
//   return (
//     <>
//       <h1>Huấn</h1>
//     </>
//   );
// };

// export default LoginFacebook;
