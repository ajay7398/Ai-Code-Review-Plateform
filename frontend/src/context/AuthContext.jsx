// src/context/AuthContext.jsx
// Global state for authentication — wraps the whole app
// Any component can read/update auth state using useAuth() hook

import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

// 1. Create the context (like a global variable)
const AuthContext = createContext(null);

// 2. Create the Provider component (wraps the app and provides the value)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current logged-in user
  const [loading, setLoading] = useState(true); // True while checking if user is already logged in

  // On app load, check if there's already a saved token and load the user
  useEffect(() => {
    const initAuth = async () => {
     
        try {
          setLoading(true);
          const  data = await authAPI.getProfile();
          const user=data.data.user;
          setUser(user);
          setLoading(false);
        } catch (error) {
          // Token is invalid or expired — clear it
          console.error("Failed to load user profile:", error);
          setUser(null);
          setLoading(false);
        }
      }
     
    initAuth();
  }, []);

  // Login: save token to localStorage and set user in state
  const login = (userData) => {
    setUser(userData);
  };

  // Logout: remove token and clear user from state
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user, // true if user is not null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom hook — makes it easy to use AuthContext in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
