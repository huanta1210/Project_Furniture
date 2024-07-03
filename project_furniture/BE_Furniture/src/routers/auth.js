import express from "express";
import { loginUser, registerUser } from "../controllers/auth";

const routerAuth = express.Router();

routerAuth.post("/register", registerUser);
routerAuth.post("/login", loginUser);

export default routerAuth;
