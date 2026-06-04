// src/services/api.js
// Central place for all API calls to the backend
// Using axios for HTTP requests

import axios from "axios";

// Base URL for all API calls — matches backend server
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Automatically attach the JWT token to every request that needs auth
api.interceptors.request.use((config) => {
  // Get token from localStorage (where we store it after login)
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth API Calls ───────────────────────────────────────────────────────────

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
};

// ─── Review API Calls ─────────────────────────────────────────────────────────

export const reviewAPI = {
  create: (data) => api.post("/reviews", data),
  getAll: () => api.get("/reviews"),
  getById: (id) => api.get(`/reviews/${id}`),
  delete: (id) => api.delete(`/reviews/${id}`),
  getStats: () => api.get("/reviews/stats"),
};

export default api;
