import express, { Router } from "express";
import userRouter from "./users.js";
import categoryRouter from "./category.js";
import brandRouter from "./brand.js";
import deviceRouter from "./device.js";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

export default router;
