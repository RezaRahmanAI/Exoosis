/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0052FF",
        "primary-dark": "#0040C7",
        "background-light": "#FFFFFF",
        "background-dark": "#0B1120",
        "accent-purple": "#2563EB",
        "accent-blue": "#38BDF8",
        "surface-light": "#F8FAFC",
        "surface-dark": "#1E293B",
        "border-light": "#E2E8F0",
        "border-dark": "#334155",
        "navy-blue": "#0a2540",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        pill: "50rem",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 30s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
