/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    fontMetrics: {
      sans: require("@capsizecss/metrics/inter"),
      mono: require("@capsizecss/metrics/jetBrainsMono"),
    },
    extend: {},
  },
  plugins: [require("tailwindcss-capsize")],
};
