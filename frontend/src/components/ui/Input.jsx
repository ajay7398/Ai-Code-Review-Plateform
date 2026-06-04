// src/components/ui/Input.jsx
// Reusable styled input field

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  required = false,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      {label && (
        <label
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {label} {required && <span style={{ color: "#ff4d6d" }}>*</span>}
        </label>
      )}

      {/* Input wrapper (for icon support) */}
      <div className="relative">
        {icon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-secondary)" }}
          >
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full rounded-xl px-4 py-3 text-sm outline-none transition-all
            ${icon ? "pl-10" : ""}
          `}
          style={{
            background: "var(--bg-secondary)",
            border: `1px solid ${error ? "#ff4d6d" : "var(--border)"}`,
            color: "var(--text-primary)",
            fontFamily: "'Syne', sans-serif",
          }}
          onFocus={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = "rgba(108, 99, 255, 0.5)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(108, 99, 255, 0.1)";
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <span className="text-xs" style={{ color: "#ff4d6d" }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
