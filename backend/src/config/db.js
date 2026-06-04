// src/config/db.js
// This file handles the MongoDB connection using Mongoose

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the process if connection fails
    process.exit(1);
  }
};

export default connectDB;
