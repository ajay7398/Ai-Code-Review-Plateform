// src/pages/LandingPage.jsx
// Public homepage shown to visitors who are not logged in

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Zap, Shield, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

// Features list for the features section
const features = [
  {
    icon: <Code2 size={20} />,
    title: "Multi-Language Support",
    desc: "JavaScript, Python, TypeScript, Java, C++ and more.",
    color: "#6c63ff",
  },
  {
    icon: <Zap size={20} />,
    title: "Instant AI Review",
    desc: "Get detailed feedback in seconds powered by Claude AI.",
    color: "#ffd166",
  },
  {
    icon: <Shield size={20} />,
    title: "Security Scanning",
    desc: "Detects security vulnerabilities before they hit production.",
    color: "#ff4d6d",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Quality Score",
    desc: "Quantified code quality score from 0–100.",
    color: "#00d97e",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen max-w-screen flex flex-col items-center" style={{ background: "var(--bg-primary)" }}>
      {/* Background grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
          style={{
            background: "rgba(108, 99, 255, 0.1)",
            border: "1px solid rgba(108, 99, 255, 0.3)",
            color: "#6c63ff",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          Powered by Claude AI
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          Code Review
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #6c63ff, #00d97e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Supercharged
          </span>
          <br />
          by AI
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          Paste your code and get instant AI-powered reviews — find bugs,
          security issues, performance problems, and style improvements in
          seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all"
            style={{
              background: "linear-gradient(135deg, #6c63ff, #8b85ff)",
              color: "white",
              boxShadow: "0 8px 32px rgba(108, 99, 255, 0.35)",
            }}
          >
            Start for Free
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          >
            Sign In
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-2xl p-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${f.color}15`, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center ">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-12"
        >
          How it works
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8">
          {["Paste your code", "AI analyzes it", "Get detailed feedback"].map(
            (step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 flex flex-col items-center gap-3"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold font-code"
                  style={{
                    background: "rgba(108, 99, 255, 0.15)",
                    border: "1px solid rgba(108, 99, 255, 0.3)",
                    color: "#6c63ff",
                  }}
                >
                  {i + 1}
                </div>
                <p className="text-sm font-medium">{step}</p>
              </motion.div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
