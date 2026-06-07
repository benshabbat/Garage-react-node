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
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/", getMessages);
adminRouter.get("/populate", getMessagesByType);

// User routes — verifyUser checks req.user.id === req.params.id (user ID routes only)
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/user/:id", getMessageByUser);

// Auth routes — verifyToken only; ownership is enforced inside the service
const authRouter = express.Router();
authRouter.use(verifyToken);
authRouter.post("/to/:to", createMessageToAdmin);
authRouter.put("/:id", updateMessage);
authRouter.delete("/:id", deleteMessage);
authRouter.get("/:id", getMessage);
authRouter.post("/:to", createMessage);

router.use(adminRouter);
router.use(userRouter);
router.use(authRouter);

export default router;
