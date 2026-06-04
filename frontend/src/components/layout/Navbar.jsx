// src/components/layout/Navbar.jsx
// Top navigation bar — shows logo, nav links, and user info

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Code2, LayoutDashboard, Plus, LogOut, User } from "lucide-react";
import { authAPI } from "../../services/api";
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authAPI.logout();
    logout();
    navigate("/login");
  };

  // Helper to check if a nav link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: "rgba(17, 17, 24, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6c63ff, #00d97e)" }}
          >
            <Code2 size={16} color="white" />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Code<span style={{ color: "#6c63ff" }}>Lens</span>
          </span>
        </Link>

        {/* Nav Links — only show when logged in */}
        {isAuthenticated && (
          <div className="flex items-center gap-1">
            <NavLink
              to="/dashboard"
              icon={<LayoutDashboard size={15} />}
              label="Dashboard"
              active={isActive("/dashboard")}
            />
            <NavLink
              to="/review/new"
              icon={<Plus size={15} />}
              label="New Review"
              active={isActive("/review/new")}
            />
          </div>
        )}

        {/* Right side: user info or auth links */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* User avatar */}
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--accent-glow)", border: "1px solid var(--accent)" }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-sm hidden sm:block"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {user?.name}
                </span>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff4d6d";
                  e.currentTarget.style.borderColor = "rgba(255,77,109,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm px-4 py-1.5 rounded-lg transition-all"
                style={{ color: "var(--text-secondary)" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-1.5 rounded-lg font-medium transition-all"
                style={{
                  background: "var(--accent)",
                  color: "white",
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Small reusable nav link component
const NavLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
    style={{
      background: active ? "rgba(108, 99, 255, 0.15)" : "transparent",
      color: active ? "#6c63ff" : "var(--text-secondary)",
      border: `1px solid ${active ? "rgba(108, 99, 255, 0.3)" : "transparent"}`,
    }}
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;
