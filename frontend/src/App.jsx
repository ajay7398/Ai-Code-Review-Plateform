// src/App.jsx
// Root component — sets up routing and global providers

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NewReviewPage from "./pages/NewReviewPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/review/new" element={<ProtectedRoute><NewReviewPage /></ProtectedRoute>} />
          <Route path="/review/:id" element={<ProtectedRoute><ReviewDetailPage /></ProtectedRoute>} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#16161f",
              color: "#f0f0f8",
              border: "1px solid rgba(255,255,255,0.07)",
              fontFamily: "'Syne', sans-serif",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#00d97e", secondary: "#16161f" } },
            error: { iconTheme: { primary: "#ff4d6d", secondary: "#16161f" } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
