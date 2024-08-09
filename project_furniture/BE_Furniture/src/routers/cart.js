import express from "express";
import {
  createCart,
  deleteAllCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controllers/cart";

const routerCart = express.Router();

routerCart.get("/:userId", getCart);
routerCart.post("/create-cart", createCart);
routerCart.put("/update-cart/:userId/item/:productId", updateCart);
routerCart.delete("/delete-cart/:userId/:productId", deleteCart);
routerCart.delete("/delete-all-cart/:userId", deleteAllCart);

export default routerCart;
