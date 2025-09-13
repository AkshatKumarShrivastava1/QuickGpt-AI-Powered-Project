// import express from "express";
// import { getPlans, purchasePlan } from "../controllers/creditController.js";
// import { protect } from "../middlewares/auth.js";

// const creditRouter = express.Router();

// // ✅ Fetch available plans
// creditRouter.get("/plan", getPlans);

// // ✅ Purchase a plan (requires authentication)
// creditRouter.post("/purchase", protect, purchasePlan);

// export default creditRouter;

import express from "express";
import { getPlans, purchasePlan, confirmPayment } from "../controllers/creditController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/plan", protect, getPlans);
router.post("/purchase", protect, purchasePlan);

// ✅ No auth required because Stripe redirects don’t send token
router.post("/confirm", confirmPayment);

export default router;


