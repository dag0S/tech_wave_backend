import express, { Router } from "express";
import userRouter from "./users.js";
import categoryRouter from "./category.js";
import brandRouter from "./brand.js";
import deviceRouter from "./device.js";
import favoritesRouter from "./favorites.js";
import ratingRouter from "./rating.js";
import basketRouter from "./basket.js";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/favorites", favoritesRouter);
router.use("/rating", ratingRouter);
router.use("/basket", basketRouter);

export default router;
