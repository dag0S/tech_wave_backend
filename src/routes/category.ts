import express, { Router } from "express";
import { create, getAll } from "../controllers/category.js";
import { checkRole } from "../middlewares/checkRole.js";

const router: Router = express.Router();

// /api/category/create
router.post("/create", checkRole('ADMIN'), create);
// /api/category/
router.get("/", getAll);

export default router;
