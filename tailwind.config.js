const colors = require('tailwindcss/colors')  

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
          colors: {
            transparent: 'transparent',
            current: 'currentColor',
      
            black: colors.black,
            white: colors.white,
            gray: colors.coolGray,
            red: colors.red,
            yellow: colors.amber,
            green: colors.emerald,
            blue: colors.blue,
            indigo: colors.indigo,
            purple: colors.violet,
            pink: colors.pink,
            primary: '#3F75E7'
          },
          minWidth: {
              minimum: '6.25rem',
          },
          backgroundImage: {
              check: "url('./src/public/icons/check.svg')",
          },
          fontFamily: {
              primary: ['Inter', 'sans-serif']
      },
          
      fontSize:{
        'extra-sm': '13px',
        'small': '14px',
        'xs': '15px',
        'large': '19px',
        'x-large': '20px',
        'sem-bold': '18.5px'
      }
      },
  },
  variants: {
      extend: {},
  },
  plugins: [],
};