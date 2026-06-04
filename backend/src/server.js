// src/server.js
// Main entry point — sets up Express app, connects to DB, and starts the server

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
 // "http://localhost:5173",
// Allow Cross-Origin requests (so our React frontend can talk to this server)
// More explicit CORS setup — works better on Render
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://codelens-app.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Parse incoming JSON request bodies (so req.body works)
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check route — visit http://localhost:5000/api to test if server is running
app.get("/api", (req, res) => {
  res.json({ message: "AI Code Review API is running! 🚀" });
});

// Authentication routes: /api/auth/register, /api/auth/login, etc.
app.use("/api/auth", authRoutes);

// Review routes: /api/reviews, /api/reviews/:id, etc.
app.use("/api/reviews", reviewRoutes);

// ─── Global Error Handler (must be LAST) ─────────────────────────────────────
app.use(errorHandler);



// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 Environment: ${process.env.NODE_ENV || "development"}`);
 
});
