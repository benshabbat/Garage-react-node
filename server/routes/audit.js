import express from "express";
import { getAuditLogs } from "../controllers/audit.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.use(verifyAdmin);
router.get("/", getAuditLogs);

export default router;
