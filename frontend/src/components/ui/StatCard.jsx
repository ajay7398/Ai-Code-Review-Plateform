// src/components/ui/StatCard.jsx
// Displays a single metric (total reviews, avg score, etc.)

import { motion } from "framer-motion";

const StatCard = ({ label, value, icon, color = "#6c63ff", index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl p-5"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `${color}15`,
          color: color,
        }}
      >
        {icon}
      </div>

      {/* Value */}
      <div
        className="text-3xl font-bold mb-1"
        style={{ color: "var(--text-primary)", fontFamily: "'Space Mono', monospace" }}
      >
        {value}
      </div>

      {/* Label */}
      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard;
