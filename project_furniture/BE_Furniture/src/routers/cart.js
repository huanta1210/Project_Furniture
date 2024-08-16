import express from "express";
import {
  createCart,
  deleteAllCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controllers/cart";
import { checkCartOwnerShip } from "../middlewares/checkCartOwnerShip";
import { authenticateToken } from "../middlewares/checkTokenUser";

const routerCart = express.Router();

routerCart.get("/:userId", authenticateToken, checkCartOwnerShip, getCart);
routerCart.post("/create-cart", authenticateToken, createCart);
routerCart.put(
  "/update-cart/:userId/item/:productId",
  authenticateToken,
  checkCartOwnerShip,
  updateCart
);
routerCart.delete(
  "/delete-cart/:userId/:productId",
  authenticateToken,
  checkCartOwnerShip,
  deleteCart
);
routerCart.delete(
  "/delete-all-cart/:userId",
  authenticateToken,
  checkCartOwnerShip,
  deleteAllCart
);

export default routerCart;
