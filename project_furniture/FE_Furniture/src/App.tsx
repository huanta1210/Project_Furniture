import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<PrivateRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
