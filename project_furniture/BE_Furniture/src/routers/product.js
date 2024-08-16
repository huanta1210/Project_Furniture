import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getDetailsProduct,
  updateProduct,
  updateProductStock,
} from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const routerProduct = express.Router();

routerProduct.get("/", getAllProduct);

routerProduct.get("/:id", getDetailsProduct);

routerProduct.post("/create-product", checkPermission, createProduct);

routerProduct.put("/edit-product/:id", checkPermission, updateProduct);

routerProduct.put("/edit-product/edit-stock/:productId", updateProductStock);

routerProduct.delete("/delete-product/:id", checkPermission, deleteProduct);

export default routerProduct;
