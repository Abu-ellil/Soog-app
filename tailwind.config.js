/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}'
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        'primary-dark': '#0056b3',
        secondary: '#6c757d',
        'secondary-dark': '#545b62',
        success: '#28a745',
        info: '#17a2b8',
        warning: '#ffc107',
        danger: '#dc3545',
        light: '#f8f9fa',
        dark: '#343a40',
        'light-gray': '#f5f5f5',
        border: '#ddd',
      }
    },
  },
  plugins: [],
};
