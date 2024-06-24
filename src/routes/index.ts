import express, { Router } from "express";
import userRouter from "./users.js";
import categoryRouter from "./category.js";
import brandRouter from "./brand.js";
import deviceRouter from "./device.js";
import favoritesRouter from "./favorites.js";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/favorites", favoritesRouter);

export default router;
