import express, { Router } from "express";
import userRouter from "./users.js";
import typeRouter from "./type.js";
import brandRouter from "./brand.js";
import deviceRouter from "./device.js";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

export default router;
