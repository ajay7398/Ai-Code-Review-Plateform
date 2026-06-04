// src/middleware/errorMiddleware.js
// Global error handler — catches errors from all routes

// This middleware runs when next(error) is called anywhere in the app
const errorHandler = (err, req, res, next) => {
  // If status code is still 200 (meaning no status was set), make it 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Only show detailed error stack in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
