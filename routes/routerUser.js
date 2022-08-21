import express from "express";
import { authToken } from "../middleware/middleware.js";
import { createUser, getDashboardPage, userLogin }
 from "../controllers/userController.js";
const router = express.Router();

router.post("/register", createUser)
router.post("/login", userLogin)
router.get("/dashboard", authToken, getDashboardPage)

export default router; 