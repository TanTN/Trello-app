/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "textColor": "#b6c2cf",
                "bgColor": "#1d2125"
          }
      },
    },
    plugins: [],
  }