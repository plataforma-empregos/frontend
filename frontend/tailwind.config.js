/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--clr-bg-primary)",
        "bg-secondary": "var(--clr-bg-secondary)",
        "text-primary": "var(--clr-text-primary)",
        "text-secondary": "var(--clr-text-secondary)",
        "text-muted": "var(--clr-text-muted)",
        "text-inverse": "var(--clr-text-inverse)",
        "accent-primary": "var(--clr-accent-primary)",
        "accent-secondary": "var(--clr-accent-secondary)",
        "accent-tertiary": "var(--clr-accent-tertiary)",
        "danger-primary": "var(--clr-danger-primary)",
        "danger-secondary": "var(--clr-danger-secondary)",
        "footer-bg": "var(--clr-footer-bg)",
        "footer-text": "var(--clr-footer-text)",
        "footer-border": "var(--clr-footer-border)",
      },
    },
  },
  plugins: [],
};
