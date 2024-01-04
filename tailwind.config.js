/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  lightMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // darkMode

        // "primary-500": "#f95959",
        // "primary-600": "#be3144",
        // "secondary-500": "#FFB620",
        // "off-white": "#D0DFFF",
        // red: "#FF5A5A",
        // "dark-1": "#233142",
        // "dark-2": "#3F5576",
        // "dark-3": "#21273d",
        // "dark-4": "#1C274C",
        // "light-1": "#FFFFFF",
        // "light-2": "#e3e3e3",
        // "light-3": "#7878A3",
        // "light-4": "#5C5C7B",
        // "light-5": "#4f6b94",

        // lightMode
        "primary-400": "#ffc07a", //bg dropzone
        "primary-500": "#FF9846", //buttons, text hover
        "primary-600": "#F46D40",
        "secondary-500": "#FFB620",
        "off-white": "#FFFFFF",
        red: "#EB5757",
        "dark-1": "#0b0f15",
        "dark-2": "#3F5576",
        "dark-3": "#21273d",
        "dark-4": "#1C274C",
        "light-1": "#F2F2F2", //bg
        "light-2": "#A4ACAD", //icons, light text
        "light-3": "#4f6b94",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
