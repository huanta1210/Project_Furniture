import express from "express";
import routerProduct from "./product";
import routerAuth from "./auth";

const router = express.Router();

router.use("/product", routerProduct);
router.use("/auth", routerAuth);

export default router;
