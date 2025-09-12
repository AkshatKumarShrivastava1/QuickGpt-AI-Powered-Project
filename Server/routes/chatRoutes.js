import express from "express";
import { createChat, getChat, deleteChat } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

// Routes
chatRouter.get("/create", protect, createChat);
chatRouter.get("/get", protect, getChat);
chatRouter.post("/delete", protect, deleteChat);

export default chatRouter;