import express from "express";
import {
  getContacts,
  createContact,
  deleteContact,
} from "../controllers/contact.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// Public routes
router.post("/", createContact);

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/", getContacts);
adminRouter.delete("/:id", deleteContact);

router.use(adminRouter);

export default router;
