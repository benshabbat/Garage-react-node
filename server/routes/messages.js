import express from "express";
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
  getMessages,
  createMessageToAdmin,
  getMessagesByType,
  getMessageByUser,
} from "../controllers/message.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Admin routes
router.get("/", verifyAdmin, getMessages);
router.get("/populate", verifyAdmin, getMessagesByType);

// User routes
router.get("/user/:id", verifyUser, getMessageByUser);
router.put("/:id", verifyUser, updateMessage);
router.delete("/:id", verifyUser, deleteMessage);
router.get("/:id", verifyUser, getMessage);

// Public route - contact form (anyone can send a message to admin)
router.post("/to/:to", createMessageToAdmin);
// Authenticated route - message between users (requires login)
router.post("/:from/:to", verifyToken, createMessage);     

export default router;