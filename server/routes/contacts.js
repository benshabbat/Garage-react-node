import express from "express";
import { getContacts, createContact } from "../controllers/contact.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//GET ALL
router.get("/", verifyAdmin,getContacts);

//POST
router.post("/", createContact);

export default router;