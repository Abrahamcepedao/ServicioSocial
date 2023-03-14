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
      'dark': '#0e1320',
      'darkAlt': '#1C2536',
      'light': '#f9fdff',
      'lightAlt': '#eff1f9',
      'primary': '#256EFF',
      'secondary': '#d72638',
      'terciary': '#6c969d',
      'student': "#d6192c",
      'partner': "#17c4be",
      'admin': "#1973c6",
      'dash1': "rgba(239, 55, 55, 0.15)",
      'dash2': "rgba(52, 90, 239, 0.15)",
      'dash3': "rgba(67, 206, 205, 0.15)",
      'dash4': "rgba(72, 214, 112, 0.15)",
      'dash5': "rgba(228, 21, 119, 0.15)",
      'dash6': "rgba(234, 99, 21, 0.15)",
      'chart1': "#A6CEE3",
      'chart2': "#2078B3",
    },
    colors: {
      'black': '#1b1c1d',
      'white': '#f9fdff',
      'primary': '#256EFF',
      'secondary': '#d72638',
      'terciary': '#6c969d',
      'gray': '#ced4da',
      'dash1': "#ef1717",
      'dash2': "#345aef",
      'dash3': "#23cece",
      'dash4': "#1dd670",
      'dash5': "#e51677",
      'dash6': "#ea6315",
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
