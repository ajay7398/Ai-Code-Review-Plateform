// src/routes/reviewRoutes.js
// Defines the URL endpoints for code reviews

import express from "express";
import {
  createReview,
  getMyReviews,
  getReviewById,
  deleteReview,
  getStats,
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All review routes are protected — user must be logged in
// protect middleware runs before every route handler

// GET  /api/reviews/stats → Get dashboard statistics
router.get("/stats", protect, getStats);

// GET  /api/reviews → Get all reviews for current user
// POST /api/reviews → Create a new review
router.route("/").get(protect, getMyReviews).post(protect, createReview);

// GET    /api/reviews/:id → Get one review
// DELETE /api/reviews/:id → Delete a review
router
  .route("/:id")
  .get(protect, getReviewById)
  .delete(protect, deleteReview);

export default router;
