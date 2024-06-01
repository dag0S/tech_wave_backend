import express, { Router } from "express";
import { create, getAll } from "../controllers/brand.js";
import { checkRole } from "../middlewares/checkRole.js";

const router: Router = express.Router();

// /api/brand/create
router.post("/create",checkRole('ADMIN'), create);
// /api/brand/
router.get("/", getAll);

export default router;
