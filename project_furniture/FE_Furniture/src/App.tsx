import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import PrivateRouter from "./components/PrivateRouter";
import LoginGoogle from "./pages/login/Login-Google";
import LoginFacebook from "./pages/login/Login-Facebook";
import Doasboard from "./pages/admin/Doasboard";
import ProductAdmin from "./pages/admin/ProductAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/google/:id" element={<LoginGoogle />} />
        <Route path="/login/facebook/:id" element={<LoginFacebook />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="dashboard" element={<Doasboard />} />
          <Route path="products" element={<ProductAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
