import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersByType,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//GET ALL BY POPULATE
router.get("/populate", verifyAdmin, getUsersByType);
//GET ALL
router.get("/", verifyAdmin, getUsers);

//GET
router.get("/:id", verifyUser, getUser);
//UPDATE
router.put("/:id", verifyAdmin, updateUser);
//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

export default router;
