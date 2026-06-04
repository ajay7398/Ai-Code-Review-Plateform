// src/components/review/IssueCard.jsx
// Displays a single issue found by the AI reviewer

import { motion } from "framer-motion";
import { Bug, Shield, Zap, Palette, Lightbulb } from "lucide-react";

// Map issue type to icon and color
const typeConfig = {
  bug: { icon: <Bug size={14} />, color: "#ff4d6d", bg: "rgba(255,77,109,0.1)", label: "Bug" },
  security: { icon: <Shield size={14} />, color: "#ff9a3c", bg: "rgba(255,154,60,0.1)", label: "Security" },
  performance: { icon: <Zap size={14} />, color: "#ffd166", bg: "rgba(255,209,102,0.1)", label: "Performance" },
  style: { icon: <Palette size={14} />, color: "#6c63ff", bg: "rgba(108,99,255,0.1)", label: "Style" },
  suggestion: { icon: <Lightbulb size={14} />, color: "#00d97e", bg: "rgba(0,217,126,0.1)", label: "Suggestion" },
};

// Map severity to color
const severityColor = {
  critical: "#ff4d6d",
  high: "#ff9a3c",
  medium: "#ffd166",
  low: "#6c63ff",
  info: "#8888aa",
};

const IssueCard = ({ issue, index }) => {
  const config = typeConfig[issue.type] || typeConfig.suggestion;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className="rounded-xl p-4"
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Top row: type badge + severity + line number */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {/* Issue type badge */}
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ background: config.bg, color: config.color }}
        >
          {config.icon}
          {config.label}
        </span>

        {/* Severity badge */}
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            color: severityColor[issue.severity],
            background: `${severityColor[issue.severity]}15`,
          }}
        >
          {issue.severity}
        </span>

        {/* Line number (if available) */}
        {issue.line && (
          <span
            className="text-xs font-code ml-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Line {issue.line}
          </span>
        )}
      </div>

      {/* Issue message */}
      <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>
        {issue.message}
      </p>

      {/* Suggestion (if available) */}
      {issue.suggestion && (
        <div
          className="rounded-lg p-3 mt-2"
          style={{
            background: "rgba(0, 217, 126, 0.05)",
            borderLeft: "2px solid rgba(0, 217, 126, 0.4)",
          }}
        >
          <p className="text-xs" style={{ color: "#00d97e" }}>
            <span className="font-medium">Fix: </span>
            {issue.suggestion}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default IssueCard;
