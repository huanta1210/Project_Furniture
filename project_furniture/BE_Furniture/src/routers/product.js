import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getDetailsProduct,
  updateProduct,
} from "../controllers/product";

const routerProduct = express.Router();

routerProduct.get("/", getAllProduct);

routerProduct.get("/:id", getDetailsProduct);

routerProduct.post("/create-product", createProduct);

routerProduct.put("/edit-product/:id", updateProduct);

routerProduct.delete("/delete-product/:id", deleteProduct);

export default routerProduct;
