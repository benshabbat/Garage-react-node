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
router.put("/:idMessage", verifyUser, updateMessage);
router.delete("/:id", verifyUser, deleteMessage);
router.get("/:id", verifyUser, getMessage);

// Public routes 
router.post("/to/:to", createMessageToAdmin); 
router.post("/:from/:to", createMessage);     

export default router;