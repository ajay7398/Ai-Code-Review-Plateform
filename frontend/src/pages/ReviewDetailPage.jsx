// src/pages/ReviewDetailPage.jsx
// Shows the full AI review results for a single review

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  Calendar,
  Code2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { reviewAPI } from "../services/api";
import IssueCard from "../components/review/IssueCard";
import ScoreRing from "../components/ui/ScoreRing";

// Group issues by severity for the summary row
const countBySeverity = (issues) => {
  return issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
    return acc;
  }, {});
};

const ReviewDetailPage = () => {
  const { id } = useParams(); // Get review ID from URL

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCode, setShowCode] = useState(false); // Toggle code view

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await reviewAPI.getById(id);
        setReview(data);
      } catch (error) {
        toast.error("Failed to load review");
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(108,99,255,0.3)", borderTopColor: "#6c63ff" }}
        />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Review not found</h2>
        <Link to="/dashboard" className="text-sm mt-3 inline-block" style={{ color: "#6c63ff" }}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  const severityCounts = countBySeverity(review.issues);
  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="max-w-5xl mx-auto px-6 py-10"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Back button */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-sm mb-6 transition-all"
        style={{ color: "var(--text-secondary)" }}
      >
        <ArrowLeft size={15} />
        Back to Dashboard
      </Link>

      {/* Review header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-start gap-6 flex-wrap">
          {/* Score ring */}
          {review.score !== null && (
            <ScoreRing score={review.score} size={100} />
          )}

          {/* Review info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{review.title}</h1>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "rgba(108, 99, 255, 0.1)",
                  color: "#6c63ff",
                }}
              >
                {review.language}
              </span>
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                <Calendar size={11} />
                {date}
              </span>
            </div>

            {/* AI Summary */}
            {review.summary && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {review.summary}
              </p>
            )}
          </div>
        </div>

        {/* Severity breakdown row */}
        {review.issues.length > 0 && (
          <div className="flex gap-3 mt-5 pt-5 flex-wrap" style={{ borderTop: "1px solid var(--border)" }}>
            {Object.entries(severityCounts).map(([severity, count]) => {
              const colors = {
                critical: "#ff4d6d",
                high: "#ff9a3c",
                medium: "#ffd166",
                low: "#6c63ff",
                info: "#8888aa",
              };
              return (
                <span
                  key={severity}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    color: colors[severity],
                    background: `${colors[severity]}15`,
                  }}
                >
                  {count} {severity}
                </span>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Toggle: Show Code button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCode((prev) => !prev)}
          className="text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
          style={{
            background: showCode ? "rgba(108,99,255,0.15)" : "var(--bg-card)",
            border: "1px solid var(--border)",
            color: showCode ? "#6c63ff" : "var(--text-secondary)",
          }}
        >
          <Code2 size={14} />
          {showCode ? "Hide Code" : "Show Code"}
        </button>
      </div>

      {/* Code viewer (collapsible) */}
      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl overflow-hidden mb-6"
          style={{ border: "1px solid var(--border)" }}
        >
          <div
            className="px-4 py-3"
            style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="text-xs font-code" style={{ color: "var(--text-secondary)" }}>
              {review.language}
            </span>
          </div>
          <Editor
            height="300px"
            language={review.language}
            value={review.code}
            theme="vs-dark"
            options={{
              readOnly: true, // View only, can't edit
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 12 },
            }}
          />
        </motion.div>
      )}

      {/* Issues list */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle size={18} style={{ color: "#ffd166" }} />
          Issues Found ({review.issues.length})
        </h2>

        {review.issues.length === 0 ? (
          // No issues = great code!
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl p-10 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <CheckCircle size={40} color="#00d97e" className="mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-1">No issues found!</h3>
            <p style={{ color: "var(--text-secondary)" }}>
              Your code looks clean. Great work!
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {review.issues.map((issue, i) => (
              <IssueCard key={i} issue={issue} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetailPage;
