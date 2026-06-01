import express from "express";
import { chat } from "../controllers/agent.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/chat", verifyToken, chat);

export default router;
