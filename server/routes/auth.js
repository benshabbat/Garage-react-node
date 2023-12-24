import express from "express";
import { register,login,logout } from "../controllers/auth.js";
import { verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

router.post("/register",verifyAdmin,register );
router.post("/login",login );
router.post("/logout", logout)
export default router