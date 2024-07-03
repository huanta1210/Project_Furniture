import express from "express";
import routerProduct from "./product";
import routerAuth from "./auth";
import routerCategories from "./categories";

const router = express.Router();

router.use("/product", routerProduct);
router.use("/auth", routerAuth);
router.use("/categories", routerCategories);

export default router;
