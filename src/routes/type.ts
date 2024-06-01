import express, { Router } from "express";
import { create, getAll } from "../controllers/type.js";
import { checkRole } from "../middlewares/checkRole.js";

const router: Router = express.Router();

// /api/type/create
router.post("/create", checkRole('ADMIN'), create);
// /api/type/
router.get("/", getAll);

export default router;
