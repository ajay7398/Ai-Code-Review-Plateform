// src/components/ui/ScoreRing.jsx
// Circular progress ring that shows the code quality score

const ScoreRing = ({ score, size = 100 }) => {
  // SVG circle math
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius; // Full circle length
  const strokeDashoffset = circumference - (score / 100) * circumference; // How much to "fill"

  // Color changes based on score
  const getColor = (s) => {
    if (s >= 80) return "#00d97e"; // Green = great
    if (s >= 60) return "#ffd166"; // Yellow = ok
    if (s >= 40) return "#ff9a3c"; // Orange = needs work
    return "#ff4d6d";              // Red = poor
  };

  const color = getColor(score);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={6}
        />
        {/* Filled arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>

      {/* Score number in center */}
      <div className="absolute flex flex-col items-center">
        <span className="font-bold" style={{ fontSize: size * 0.22, color }}>
          {score}
        </span>
        <span style={{ fontSize: size * 0.11, color: "var(--text-secondary)" }}>
          /100
        </span>
      </div>
    </div>
  );
};

export default ScoreRing;
