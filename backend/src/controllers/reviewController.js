// src/controllers/reviewController.js
// Handles creating, fetching, and deleting code reviews
// Uses the Anthropic Claude API to analyze code
 
import Groq from "groq-sdk";
import Review from "../models/Review.js";
 
// ─── Helper: Build the prompt sent to Claude AI ───────────────────────────────
const buildReviewPrompt = (code, language) => {
  return `You are an expert code reviewer. Analyze the following ${language} code and provide a structured JSON response.
 
CODE TO REVIEW:
\`\`\`${language}
${code}
\`\`\`
 
Respond with ONLY a valid JSON object (no markdown, no extra text) in this exact format:
{
  "summary": "A 2-3 sentence overall assessment of the code quality",
  "score": <number between 0 and 100 representing overall code quality>,
  "issues": [
    {
      "type": "<one of: bug, security, performance, style, suggestion>",
      "severity": "<one of: critical, high, medium, low, info>",
      "line": <line number or null if not applicable>,
      "message": "Clear description of the issue",
      "suggestion": "How to fix or improve it"
    }
  ]
}
 
Rules:
- Be specific and actionable in your feedback
- Find ALL issues, minimum 3 and maximum 15 most important ones
- More issues = lower score, fewer issues = higher score
- Score 90-100: excellent code, very few or no issues
- Score 70-89: good code, only minor issues like missing rate limiting or logging
- Score 50-69: average code, has some real bugs or medium security issues
- Score 30-49: poor code, has critical bugs or major security vulnerabilities
- Score 0-29: very poor code, has multiple critical vulnerabilities like SQL injection, hardcoded secrets, no error handling
- Be fair and realistic — code that uses bcrypt, JWT, input validation, env variables, error handling deserves 75+ even if minor issues exist
- Do NOT penalize for using in-memory storage if no database is required
- Do NOT give critical severity to env variables usage — that is the CORRECT approach
- If code is empty or too short, give score 0 and explain in summary`;
};
 
// ─── Helper: Call the Groq API (FREE tier) ───────────────────────────────────
const callGroqAPI = async (code, language) => {
  // Initialize Groq client — reads GROQ_API_KEY from .env automatically
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
 
  // llama-3.3-70b-versatile: free, fast, very capable for code review
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: buildReviewPrompt(code, language) }],
    temperature: 0.3,
    max_tokens: 2000,
  });
 
  const rawText = response.choices[0].message.content;
 
  // Strip markdown code fences if the model adds them
  const cleaned = rawText.replace(/```json|```/g, "").trim();
 
  const reviewData = JSON.parse(cleaned);
  return reviewData;
};
 
// @desc    Create a new code review (calls Claude AI)
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { title, code, language } = req.body;
 
    if (!title || !code || !language) {
      return res
        .status(400)
        .json({ message: "Title, code, and language are required" });
    }
 
    // Save review to DB first with "pending" status
    const review = await Review.create({
      user: req.user._id,
      title,
      code,
      language,
      status: "pending",
    });
 
    // Call Claude AI to analyze the code
    const aiResult = await callGroqAPI(code, language);
 
    // Update the review with AI results
    review.summary = aiResult.summary;
    review.score = aiResult.score;
    review.issues = aiResult.issues || [];
    review.status = "completed";
    await review.save();
 
    res.status(201).json(review);
  } catch (error) {
    console.error("Review creation error:", error.message);
 
    // If AI call fails, still return error but mark review as failed
    res.status(500).json({ message: "Failed to create review: " + error.message });
  }
};
 
// @desc    Get all reviews for the logged-in user
// @route   GET /api/reviews
// @access  Private
export const getMyReviews = async (req, res) => {
  try {
    // Find all reviews belonging to this user, newest first
    const reviews = await Review.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // -1 = descending (newest first)
      .select("-code"); // Don't send code in list view to save bandwidth
 
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
 
// @desc    Get a single review by ID
// @route   GET /api/reviews/:id
// @access  Private
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
 
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
 
    // Security check: make sure the review belongs to the logged-in user
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
 
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review" });
  }
};
 
// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
 
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
 
    // Only the owner can delete their review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
 
    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};
 
// @desc    Get dashboard stats for the logged-in user
// @route   GET /api/reviews/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const userId = req.user._id;
 
    // Count total reviews
    const totalReviews = await Review.countDocuments({ user: userId });
 
    // Get all completed reviews to calculate average score
    const completedReviews = await Review.find({
      user: userId,
      status: "completed",
    }).select("score issues");
 
    // Calculate average score
    const avgScore =
      completedReviews.length > 0
        ? Math.round(
            completedReviews.reduce((sum, r) => sum + (r.score || 0), 0) /
              completedReviews.length
          )
        : 0;
 
    // Count total issues found across all reviews
    const totalIssues = completedReviews.reduce(
      (sum, r) => sum + r.issues.length,
      0
    );
 
    res.json({
      totalReviews,
      completedReviews: completedReviews.length,
      avgScore,
      totalIssues,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};