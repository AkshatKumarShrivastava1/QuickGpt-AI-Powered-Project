// import express from "express";
// import { protect } from "../middlewares/auth.js";
// import { textMessageController, imageMessageController } from "../controllers/messageController.js";

// const messageRouter = express.Router();

// messageRouter.post("/text", protect, textMessageController);
// messageRouter.post("/image", protect, imageMessageController);

// export default messageRouter;

import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
// ✅ Correctly import only the functions that exist in the controller
import { textMessageController, saveMessageController } from "../controllers/messageController.js";

const messageRouter = express.Router();

// This route for the old image generation is no longer needed and was causing the crash
// messageRouter.post("/image", authMiddleware, imageMessageController);

messageRouter.post("/text", authMiddleware, textMessageController);
messageRouter.post("/save", authMiddleware, saveMessageController);

export default messageRouter;
