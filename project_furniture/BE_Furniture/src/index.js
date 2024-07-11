import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import router from "./routers/index.js";
import dotenv from "dotenv";
import "./configs/passportGoogleConfig.js";
import "./configs/passportFacebookConfig.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connect(process.env.MONGODB_URI);

app.use("/api", router);

export const viteNodeApp = app;
