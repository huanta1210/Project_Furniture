import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/client/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import PrivateRouter from "./components/PrivateRouter";
import LoginGoogle from "./pages/login/Login-Google";
import LoginFacebook from "./pages/login/Login-Facebook";
import Doasboard from "./pages/admin/Doasboard";
import ProductAdmin from "./pages/admin/product/ProductAdmin";
import CategoriesAdmin from "./pages/admin/categories/CategoriesAdmin";
import UserAdmin from "./pages/admin/user/UserAdmin";
import ProductList from "./pages/client/ProductList";
import ProductDetails from "./pages/client/ProductDetails";
import Cart from "./pages/client/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login/google/:id" element={<LoginGoogle />} />
        <Route path="/login/facebook/:id" element={<LoginFacebook />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="dashboard" element={<Doasboard />} />
          <Route path="users" element={<UserAdmin />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
