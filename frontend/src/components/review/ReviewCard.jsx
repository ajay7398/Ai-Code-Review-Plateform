// src/components/review/ReviewCard.jsx
// Card shown in the dashboard for each past review

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Calendar, ChevronRight, Trash2 } from "lucide-react";

// Language badge colors
const langColors = {
  javascript: { bg: "rgba(255,209,102,0.1)", color: "#ffd166" },
  typescript: { bg: "rgba(108,99,255,0.1)", color: "#6c63ff" },
  python: { bg: "rgba(0,217,126,0.1)", color: "#00d97e" },
  java: { bg: "rgba(255,154,60,0.1)", color: "#ff9a3c" },
  cpp: { bg: "rgba(255,77,109,0.1)", color: "#ff4d6d" },
  default: { bg: "rgba(136,136,170,0.1)", color: "#8888aa" },
};

const ScoreBadge = ({ score }) => {
  const color =
    score >= 80 ? "#00d97e" : score >= 60 ? "#ffd166" : score >= 40 ? "#ff9a3c" : "#ff4d6d";
  return (
    <span
      className="text-sm font-bold font-code"
      style={{ color }}
    >
      {score}
      <span className="text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
        /100
      </span>
    </span>
  );
};

const ReviewCard = ({ review, index, onDelete }) => {
  const lang = langColors[review.language] || langColors.default;

  // Format the date nicely
  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl p-5 flex items-center gap-4 group transition-all"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(108, 99, 255, 0.3)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* Language icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: lang.bg }}
      >
        <Code2 size={18} style={{ color: lang.color }} />
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-medium text-sm truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {review.title}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          {/* Language tag */}
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: lang.bg, color: lang.color }}
          >
            {review.language}
          </span>
          {/* Date */}
          <span
            className="text-xs flex items-center gap-1"
            style={{ color: "var(--text-secondary)" }}
          >
            <Calendar size={11} />
            {date}
          </span>
        </div>
      </div>

      {/* Score */}
      {review.score !== null && <ScoreBadge score={review.score} />}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Delete button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(review._id);
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          style={{
            color: "#ff4d6d",
            background: "rgba(255,77,109,0.1)",
          }}
          title="Delete review"
        >
          <Trash2 size={14} />
        </button>

        {/* View details link */}
        <Link
          to={`/review/${review._id}`}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          style={{
            background: "var(--accent-glow)",
            color: "var(--accent)",
            border: "1px solid rgba(108,99,255,0.2)",
          }}
        >
          <ChevronRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
