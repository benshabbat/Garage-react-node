import express from "express";
import { getContacts, createContact,deleteContact } from "../controllers/contact.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//GET ALL
router.get("/", verifyAdmin,getContacts);
//DELETE
router.delete("/:id", verifyAdmin, deleteContact);
//POST
router.post("/", createContact);

export default router;