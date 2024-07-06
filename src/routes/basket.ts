import express, { Router } from "express";
import { add, changeCount, getAll, remove } from "../controllers/basket.js";
import { auth } from "../middlewares/auth.js";

const router: Router = express.Router();

// /api/basket/
router.get("/", auth, getAll);
// /api/basket/add
router.post("/add", auth, add);
// /api/basket/count
router.patch("/count", auth, changeCount);
// /api/basket/remove/:id
router.delete("/remove/:id", auth, remove);

export default router;
