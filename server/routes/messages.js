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

//GET ALL BY POPULATE
router.get("/populate", verifyAdmin, getMessagesByType);
//CREATE
//CREATE
router.post("/to/:to", createMessageToAdmin);
router.post("/:from/:to", createMessage);
//UPDATE
router.put("/:idMessage", verifyUser, updateMessage);
//DELETE
router.delete("/:id", verifyUser, deleteMessage);
//GET
router.get("/:id", verifyUser, getMessage);
//GET
router.get("/user/:id", verifyUser, getMessageByUser);
//GET ALL
router.get("/", verifyAdmin, getMessages);

export default router;
