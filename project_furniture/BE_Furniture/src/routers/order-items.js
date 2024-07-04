import express from "express";
import {
  createOrderItems,
  deleteOrderItems,
  getAllOrderItems,
  getDetailOrderItems,
  updateOrderItems,
} from "../controllers/order-items";

const routerOrderItems = express.Router();

routerOrderItems.get("/", getAllOrderItems);
routerOrderItems.get("/:id", getDetailOrderItems);
routerOrderItems.post("/create-orderItems", createOrderItems);
routerOrderItems.put("/update-orderItems/:id", updateOrderItems);
routerOrderItems.delete("/delete-orderItems/:id", deleteOrderItems);

export default routerOrderItems;
