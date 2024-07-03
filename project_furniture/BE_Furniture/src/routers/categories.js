import express from "express";
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  getDetailCategories,
  updateCategories,
} from "../controllers/categories";

const routerCategories = express.Router();

routerCategories.get("/", getAllCategories);
routerCategories.get("/:id", getDetailCategories);
routerCategories.post("/create-categories", createCategories);
routerCategories.put("/update-categories/:id", updateCategories);
routerCategories.delete("/delete-categories/:id", deleteCategories);

export default routerCategories;
