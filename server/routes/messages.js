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
router.get("/populate", verifyAdmin, getMessagesByType);
router.get("/", verifyAdmin, getMessages);

// Owner or admin — ":id" here is a user id
router.get("/user/:id", verifyUser, getMessageByUser);

// Authenticated — participation in the thread is enforced inside the service
router.post("/to/:to", verifyToken, createMessageToAdmin);
router.post("/:to", verifyToken, createMessage);
router.put("/:id", verifyToken, updateMessage);
router.delete("/:id", verifyToken, deleteMessage);
router.get("/:id", verifyToken, getMessage);

export default router;
