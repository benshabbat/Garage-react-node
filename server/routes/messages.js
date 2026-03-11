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

// Public routes
router.post("/to/:to", createMessageToAdmin);

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/", getMessages);
adminRouter.get("/populate", getMessagesByType);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/user/:id", getMessageByUser);
userRouter.put("/:id", updateMessage);
userRouter.delete("/:id", deleteMessage);
userRouter.get("/:id", getMessage);

// Token routes
const tokenRouter = express.Router();
tokenRouter.use(verifyToken);
tokenRouter.post("/:from/:to", createMessage);

router.use(adminRouter);
router.use(userRouter);
router.use(tokenRouter);

export default router;