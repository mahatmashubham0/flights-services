import express from "express";
import { getMyProfile, getUserAllTask, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// create the User
router.post("/create", register);

// login user
router.post("/login", login);

// logout user
router.get("/logout", logout);

// get my all task
router.get("/me", isAuthenticated, getUserAllTask);

// get my profile
router.get("/me", isAuthenticated, getMyProfile);

export default router;
