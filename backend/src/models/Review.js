// src/models/Review.js
// Defines the structure of a Code Review document in MongoDB

import mongoose from "mongoose";

// Sub-schema for individual review comments/issues found by AI
const issueSchema = new mongoose.Schema({
  type: {
    type: String,
    // Category of the issue found
    enum: ["bug", "security", "performance", "style", "suggestion"],
    required: true,
  },
  severity: {
    type: String,
    enum: ["critical", "high", "medium", "low", "info"],
    required: true,
  },
  line: {
    type: Number, // Line number where the issue was found
    default: null,
  },
  message: {
    type: String, // Description of the issue
    required: true,
  },
  suggestion: {
    type: String, // How to fix the issue
    default: "",
  },
});

const reviewSchema = new mongoose.Schema(
  {
    // Link this review to a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    language: {
      type: String,
      required: [true, "Programming language is required"],
      default: "javascript",
    },
    // The full AI-generated review summary text
    summary: {
      type: String,
      default: "",
    },
    // Array of specific issues found
    issues: [issueSchema],
    // Overall score out of 100
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    // Status of the review request
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
