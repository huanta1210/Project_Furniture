import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexContexts from "./store/contexts/indexContexts.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IndexContexts>
      <App />
      <ToastContainer />
    </IndexContexts>
  </React.StrictMode>
);
