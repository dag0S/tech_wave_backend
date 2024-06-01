import express, { Router } from "express";
import { create, getAll, getOne } from "../controllers/device.js";
import { checkRole } from "../middlewares/checkRole.js";

const router: Router = express.Router();

// /api/device/create
router.post("/create",checkRole('ADMIN'), create);
// /api/device/
router.get("/", getAll);
// /api/device/:id
router.get("/:id", getOne);

export default router;
