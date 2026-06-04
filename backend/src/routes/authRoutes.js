// src/routes/authRoutes.js
// Defines the URL endpoints for authentication

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register → Create new account
router.post("/register", registerUser);

// POST /api/auth/login → Login and get token
router.post("/login", loginUser);

// GET /api/auth/profile → Get current user info (protected)
router.get("/profile", protect, getUserProfile);

export default router;
