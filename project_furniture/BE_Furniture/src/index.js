import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import router from "./routers/index.js";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connect("mongodb://127.0.0.1:27017/db_product");

app.use("/api", router);

export const viteNodeApp = app;
