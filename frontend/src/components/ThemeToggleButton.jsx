import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(
    theme === "light" ? "moon" : "sun"
  );

  useEffect(() => {
    if (!isAnimating) {
      setCurrentIcon(theme === "light" ? "moon" : "sun");
    }
  }, [theme, isAnimating]);

  const handleToggle = () => {
    setIsAnimating(true);

    toggleTheme();

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const iconStyle = {
    width: "20px",
    height: "20px",
    display: "inline-block",
    verticalAlign: "middle",
  };

  const svgClassName = isAnimating ? "theme-icon-rotate" : "";

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded border border-transparent text-[var(--clr-text-primary)] hover:border-[var(--clr-text-secondary)] transition-colors duration-200"
      aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
      title={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
    >
      {currentIcon === "moon" ? (
        // LUA
        <svg
          className={svgClassName}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={iconStyle}
          aria-hidden="true"
        >
          <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278zM4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
        </svg>
      ) : (
        // SOL
        <svg
          className={svgClassName}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={iconStyle}
          aria-hidden="true"
        >
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z" />
        </svg>
      )}
    </button>
  );
}
