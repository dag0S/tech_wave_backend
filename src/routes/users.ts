import express, { Router } from "express";
import { login, register, current } from "../controllers/users.js";
import { auth } from "../middlewares/auth.js";

const router: Router = express.Router();

// /api/user/login
router.post("/login", login);

// /api/user/login
router.post("/register", register);

// /api/user/current
router.get("/current", auth, current);

export default router;
