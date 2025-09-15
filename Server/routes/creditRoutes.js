import express from "express";
import { getPlans, purchasePlan } from "../controllers/creditController.js";
import { authMiddleware } from "../middlewares/auth.js";

const creditRouter = express.Router();

// ✅ Fetch available plans
creditRouter.get("/plan", getPlans);

// ✅ Purchase a plan (requires authentication)
creditRouter.post("/purchase",authMiddleware, purchasePlan);

export default creditRouter;




