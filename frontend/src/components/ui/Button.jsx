// src/components/ui/Button.jsx
// Reusable button with different style variants

import { motion } from "framer-motion";

const variants = {
  primary: {
    background: "linear-gradient(135deg, #6c63ff, #8b85ff)",
    color: "white",
    border: "none",
  },
  secondary: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border)",
  },
  danger: {
    background: "rgba(255, 77, 109, 0.1)",
    color: "#ff4d6d",
    border: "1px solid rgba(255, 77, 109, 0.3)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "none",
  },
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  fullWidth = false,
}) => {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium 
        transition-all cursor-pointer
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      style={variants[variant]}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  );
};

export default Button;
