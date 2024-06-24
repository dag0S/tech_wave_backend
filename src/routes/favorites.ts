import express, { Router } from "express";
import { add, getAll, remove } from "../controllers/favorites.js";
import { auth } from "../middlewares/auth.js";

const router: Router = express.Router();

// /api/favorites/
router.get("/", auth, getAll);
// /api/favorites/add
router.post("/add", auth, add);
// /api/favorites/remove/:id
router.delete("/remove/:id", auth, remove);

export default router;
