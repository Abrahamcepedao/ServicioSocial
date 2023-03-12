/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {},
    backgroundColor: {
      'dark': '#1b1c1d',
      'light': '#f9fdff',
      'primary': '#256EFF',
      'secondary': '#d72638',
      'terciary': '#6c969d',
      'light-gray': 'rgba(100,100,100,0.05)',
      'student': "#d6192c",
      'partner': "#17c4be",
      'admin': "#1973c6"
    },
    colors: {
      'black': '#1b1c1d',
      'white': '#f9fdff',
      'primary': '#256EFF',
      'secondary': '#d72638',
      'terciary': '#6c969d',
      'gray': '#ced4da'
    },
    borderColor: {
      'all': "#968d87",
      'student': "#d6192c",
      'partner': "#17c4be",
      'admin': "#1973c6"
    },
    minWidth: {
      'xs': '40px',
      'sm': '96px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
