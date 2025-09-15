import express from "express";
import { createChat, getChat, deleteChat } from "../controllers/chatController.js";
import { authMiddleware } from "../middlewares/auth.js";

const chatRouter = express.Router();

// Routes
chatRouter.get("/create", authMiddleware, createChat);
chatRouter.get("/get", authMiddleware, getChat);
chatRouter.post("/delete", authMiddleware, deleteChat);

export default chatRouter;