// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,css}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1a73e8',
          secondary: '#fbbc05',
          accent: '#34a853',
          background: '#f1f3f4',
          // etc.
        },
      },
    fontFamily: {
        elianto: ['Elianto', 'sans-serif'],
    }
    },
    plugins: [],
  }