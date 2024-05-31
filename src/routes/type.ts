import express, { Router } from "express";
import { create, getAll } from "../controllers/type.js";

const router: Router = express.Router();

// /api/type/create
router.post("/create", create);
// /api/type/
router.get("/", getAll);

export default router;
