import express from "express";
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  getDetailCategories,
  updateCategories,
} from "../controllers/categories";
import { checkPermission } from "../middlewares/checkPermission";

const routerCategories = express.Router();

routerCategories.get("/", getAllCategories);
routerCategories.get("/:id", getDetailCategories);
routerCategories.post("/create-categories", checkPermission, createCategories);
routerCategories.put(
  "/update-categories/:id",
  checkPermission,
  updateCategories
);
routerCategories.delete(
  "/delete-categories/:id",
  checkPermission,
  deleteCategories
);

export default routerCategories;
