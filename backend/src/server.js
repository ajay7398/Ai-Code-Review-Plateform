// src/server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();



// Apply CORS middleware
app.use(cors());



// Other middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "AI Code Review API is running! 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handler - but skip OPTIONS
app.use((err, req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`✅ CORS enabled for: http://localhost:5173, https://codelens-app.netlify.app`);
});