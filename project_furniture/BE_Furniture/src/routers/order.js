import express from "express";
import {
  createOrders,
  deleteOrders,
  getAllOrders,
  getDetailOrders,
  getOrderByUserId,
  updateOrders,
} from "../controllers/order";
import { authenticateToken } from "../middlewares/checkTokenUser";
import { checkUserOrder } from "../middlewares/checkOrder";

const routerOrder = express.Router();

routerOrder.get("/", getAllOrders);
routerOrder.get(
  "/get-order/:userId",
  authenticateToken,
  checkUserOrder,
  getOrderByUserId
);
routerOrder.get("/:id", getDetailOrders);
routerOrder.post("/create-order", createOrders);
routerOrder.put("/update-order/:id", updateOrders);
routerOrder.delete("/delete-order/:id", deleteOrders);

export default routerOrder;
