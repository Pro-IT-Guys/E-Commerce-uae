/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00ab55",
        secondary: "#DA0707",
        accent: "#FFE14E",
        neutral: "#727272",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        error: "#fe0800",
      },
    },
  },
  plugins: [],
}