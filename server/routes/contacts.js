import express from "express";
import { getContacts, createContact, deleteContact } from "../controllers/contact.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Public route
router.post("/", createContact);

// Admin routes
router.get("/", verifyAdmin, getContacts);
router.delete("/:id", verifyAdmin, deleteContact);

export default router;
