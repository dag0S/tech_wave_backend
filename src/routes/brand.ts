import express, { Router } from "express";
import { create, getAll } from "../controllers/brand.js";

const router: Router = express.Router();

// /api/brand/create
router.post("/create", create);
// /api/brand/
router.get("/", getAll);

export default router;
