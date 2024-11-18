import express from "express";
import { getAppointments, createAppointment } from "../controllers/appointment.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//GET ALL
router.get("/", verifyAdmin,getAppointments);

//POST
router.post("/", createAppointment);

export default router;