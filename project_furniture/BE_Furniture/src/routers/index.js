import express from "express";
import routerProduct from "./product";
import routerAuth from "./auth";
import routerCategories from "./categories";
import routerOrder from "./order";
import routerOrderItems from "./order-items";
import routerAddress from "./address";

const router = express.Router();

router.use("/product", routerProduct);
router.use("/auth", routerAuth);
router.use("/categories", routerCategories);
router.use("/order", routerOrder);
router.use("/order-items", routerOrderItems);
router.use("/address", routerAddress);

export default router;
