import express from "express";
import { authToken } from "../middleware/middleware.js";
import { createUser, 
        followUser, 
        getAllUsers, 
        getDashboardPage,
        getUser, 
        unfollowUser,
        userLogin }


 from "../controllers/userController.js";
const router = express.Router();

router.post("/register", createUser)
router.post("/login", userLogin)
router.get("/dashboard", authToken, getDashboardPage)
router.get("/", authToken, getAllUsers)
router.get("/:id", authToken,  getUser)
router.put("/:id/follow", authToken,  followUser )
router.put("/:id/unfollow",authToken,  unfollowUser)

export default router; 