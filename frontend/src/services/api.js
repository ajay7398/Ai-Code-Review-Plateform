// src/services/api.js
// Central place for all API calls to the backend
// Using axios for HTTP requests (COOKIE BASED AUTH)

import axios from "axios";

// Base URL for all API calls — matches backend server
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // ✅ REQUIRED for cookies
  headers: {
    "Content-Type": "application/json",
  },
});


// ─── Auth API Calls ─────────────────────────────────────────

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"), // optional but recommended
  getProfile: () => api.get("/auth/profile"),
};

// ─── Review API Calls ───────────────────────────────────────

export const reviewAPI = {
  create: (data) => api.post("/reviews", data),
  getAll: () => api.get("/reviews"),
  getById: (id) => api.get(`/reviews/${id}`),
  delete: (id) => api.delete(`/reviews/${id}`),
  getStats: () => api.get("/reviews/stats"),
};

export default api;