// src/pages/NewReviewPage.jsx
// Form page where users paste their code and request an AI review

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Wand2, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import { reviewAPI } from "../services/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

// Languages available for selection
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
];

// Sample code to help users get started
const SAMPLE_CODE = {
  javascript: `function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  const result = db.execute(query);
  
  var userData = result[0];
  
  if (userData) {
    console.log("Found user: " + userData.name);
    return userData;
  }
}`,
  python: `def calculate_average(numbers):
    total = 0
    for i in range(len(numbers)):
        total = total + numbers[i]
    average = total / len(numbers)
    return average

result = calculate_average([1, 2, 3, 4, 5])
print("Average:", result)`,
};

const NewReviewPage = () => {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(SAMPLE_CODE.javascript);
  const [loading, setLoading] = useState(false);

  // Handle language change — also update sample code
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    // Only switch sample if user hasn't written anything custom
    if (SAMPLE_CODE[lang]) {
      setCode(SAMPLE_CODE[lang]);
    }
  };

  const handleSubmit = async () => {
    // Validate fields
    if (!title.trim()) {
      toast.error("Please enter a review title");
      return;
    }
    if (!code.trim() || code.trim().length < 10) {
      toast.error("Please paste some code to review");
      return;
    }

    setLoading(true);
    toast.loading("AI is reviewing your code...", { id: "reviewing" });

    try {
      const { data } = await reviewAPI.create({ title, language, code });
      toast.success("Review complete!", { id: "reviewing" });
      // Navigate to the review detail page
      navigate(`/review/${data._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Review failed. Check your API key.",
        { id: "reviewing" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-5xl mx-auto px-6 py-10"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">New Code Review</h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Paste your code below and let AI find bugs, issues, and improvements.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {/* Top controls row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 flex-wrap"
        >
          {/* Review title input */}
          <div className="flex-1 min-w-64">
            <Input
              label="Review Title"
              placeholder='e.g. "User auth function"'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon={<Code2 size={15} />}
              required
            />
          </div>

          {/* Language selector */}
          <div className="flex flex-col gap-1.5 min-w-40">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Language <span style={{ color: "#ff4d6d" }}>*</span>
            </label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="rounded-xl px-4 py-3 text-sm outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Monaco Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {/* Editor top bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* Mac-style traffic lights */}
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-green-400 opacity-70" />
            <span
              className="ml-2 text-xs font-code"
              style={{ color: "var(--text-secondary)" }}
            >
              {language}
            </span>
          </div>

          {/* The Monaco editor itself */}
          <Editor
            height="420px"
            language={language === "cpp" ? "cpp" : language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: "'Space Mono', monospace",
              minimap: { enabled: false }, // Disable the mini map for cleaner look
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              lineNumbers: "on",
              roundedSelection: true,
              automaticLayout: true,
            }}
          />
        </motion.div>

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <Button onClick={handleSubmit} loading={loading} size="lg">
            <Wand2 size={16} />
            {loading ? "Reviewing..." : "Review with AI"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NewReviewPage;
