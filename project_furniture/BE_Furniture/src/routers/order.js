import express from "express";
import {
  createOrders,
  deleteOrders,
  getAllOrders,
  getDetailOrders,
  updateOrders,
} from "../controllers/order";

const routerOrder = express.Router();

routerOrder.get("/", getAllOrders);
routerOrder.get("/:id", getDetailOrders);
routerOrder.post("/create-order", createOrders);
routerOrder.put("/update-order/:id", updateOrders);
routerOrder.delete("/delete-order/:id", deleteOrders);

export default routerOrder;
