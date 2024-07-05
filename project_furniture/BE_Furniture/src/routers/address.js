import express from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddress,
  getDetailAddress,
  updateAddress,
} from "../controllers/address";

const routerAddress = express.Router();

routerAddress.get("/", getAllAddress);
routerAddress.get("/:id", getDetailAddress);
routerAddress.post("/create-address", createAddress);
routerAddress.put("/update-address/:id", updateAddress);
routerAddress.delete("/delete-address/:id", deleteAddress);

export default routerAddress;
