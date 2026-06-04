// src/middleware/authMiddleware.js
// Protects routes — only logged-in users with a valid token can access them

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    // Extract just the token part (remove "Bearer ")
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
    }
    // Verify the token using our secret key
    // If the token is invalid or expired, this will throw an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID stored in the token
    // .select("-password") means: get all fields EXCEPT the password
    req.user = await User.findById(decoded.id).select("-password");

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
