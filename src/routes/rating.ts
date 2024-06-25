import express, { Router } from "express";
import { estimate } from "../controllers/rating.js";
import { auth } from "../middlewares/auth.js";

const router: Router = express.Router();

// /api/rating/estimate
router.post("/estimate", auth, estimate);

export default router;
