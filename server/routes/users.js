import express from "express";
import { updateUser, deleteUser, getUser, getUsers, getUsersByType } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { auditAdmin } from "../middleware/audit.js";

const router = express.Router();

// Admin routes
router.get("/populate", verifyAdmin, getUsersByType);
router.get("/", verifyAdmin, getUsers);
router.put("/:id", verifyAdmin, auditAdmin("UPDATE_USER", "User"), updateUser);
router.delete("/:id", verifyAdmin, auditAdmin("DELETE_USER", "User"), deleteUser);

// Owner or admin
router.get("/:id", verifyUser, getUser);

export default router;
