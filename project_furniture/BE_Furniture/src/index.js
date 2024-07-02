import express from "express";
import { connect } from "mongoose";
import router from "./routers/index.js";
const app = express();

app.use(express.json());

connect("mongodb://127.0.0.1:27017/db_product");

app.use("/api", router);

export const viteNodeApp = app;
