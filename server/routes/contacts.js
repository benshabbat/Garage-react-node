import express from "express";
import { getContacts, createContact } from "../controllers/contact.js";
const router = express.Router();

//GET ALL
router.get("/", getContacts);

//POST
router.post("/", createContact);

export default router;