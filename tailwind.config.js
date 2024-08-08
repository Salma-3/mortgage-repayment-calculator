const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        ...colors,
        'lime-50': 'hsl(61, 84%, 83%)',
        lime: 'hsl(61, 70%, 52%)',
        red: 'hsl(4, 69%, 50%)',
        'slate-100': 'hsl(202, 86%, 94%)',
        'slate-300': 'hsl(203, 41%, 72%)',
        'slate-500': 'hsl(200, 26%, 54%)',
        'slate-700': 'hsl(200, 24%, 40%)',
        'slate-900': 'hsl(202, 55%, 16%)',
        'slate-950': 'hsl(202, 55%, 10%)',
      }
    },
  },
  plugins: [],
}

