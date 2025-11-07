/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f6ff",
          100: "#dfeaff",
          200: "#bfe0ff",
          300: "#9fd6ff",
          400: "#6fbfff",
          500: "#0046FF",
          600: "#003be6",
          700: "#0030cc",
          800: "#002599",
          900: "#001a66",
        },
      },
    },
  },
  plugins: [],
};
