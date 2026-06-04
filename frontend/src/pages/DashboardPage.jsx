// src/pages/DashboardPage.jsx
// Main dashboard — shows user stats and list of all their past reviews

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, FileCode2, BarChart3, CheckCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { reviewAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "../components/review/ReviewCard";
import StatCard from "../components/ui/StatCard";
import Button from "../components/ui/Button";

const DashboardPage = () => {
  const { user } = useAuth();

  // State for reviews list and stats
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch reviews and stats when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Run both API calls at the same time for speed
        const [reviewsRes, statsRes] = await Promise.all([
          reviewAPI.getAll(),
          reviewAPI.getStats(),
        ]);
        setReviews(reviewsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle deleting a review
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await reviewAPI.delete(id);
      // Remove from local state without refetching
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success("Review deleted");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

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

  return (
    <div
      className="max-w-5xl mx-auto px-6 py-10"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-10 gap-4 flex-wrap"
      >
        <div>
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
            {greeting},
          </p>
          <h1 className="text-3xl font-bold">{user?.name} 👋</h1>
        </div>
        <Link to="/review/new">
          <Button size="lg">
            <Plus size={16} />
            New Review
          </Button>
        </Link>
      </motion.div>

      {/* Stats grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Total Reviews"
            value={stats.totalReviews}
            icon={<FileCode2 size={18} />}
            color="#6c63ff"
            index={0}
          />
          <StatCard
            label="Completed"
            value={stats.completedReviews}
            icon={<CheckCircle size={18} />}
            color="#00d97e"
            index={1}
          />
          <StatCard
            label="Avg Score"
            value={`${stats.avgScore}`}
            icon={<BarChart3 size={18} />}
            color="#ffd166"
            index={2}
          />
          <StatCard
            label="Issues Found"
            value={stats.totalIssues}
            icon={<AlertTriangle size={18} />}
            color="#ff9a3c"
            index={3}
          />
        </div>
      )}

      {/* Reviews list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>

        {reviews.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl p-12 text-center"
            style={{
              background: "var(--bg-card)",
              border: "1px dashed var(--border)",
            }}
          >
            <FileCode2 size={40} style={{ color: "var(--text-secondary)" }} className="mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No reviews yet</h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Submit your first code review to get started
            </p>
            <Link to="/review/new">
              <Button>
                <Plus size={15} />
                Start your first review
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((review, i) => (
              <ReviewCard
                key={review._id}
                review={review}
                index={i}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
