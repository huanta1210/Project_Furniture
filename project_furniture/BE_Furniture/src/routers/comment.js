import express from "express";
import {
  createComments,
  deleteComments,
  getAllComments,
  getDetailComments,
  updateComments,
} from "../controllers/comment";
import { checkTokenUserComments } from "../middlewares/checkPermission";

const routerComments = express.Router();

routerComments.get("/", getAllComments);
routerComments.get("/:id", getDetailComments);

routerComments.post("/create-comment", checkTokenUserComments, createComments);

routerComments.put(
  "/update-comment/:id",
  checkTokenUserComments,
  updateComments
);

routerComments.delete("/delete-comment/:id", deleteComments);

export default routerComments;
