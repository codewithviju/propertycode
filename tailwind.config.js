module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          title: '#333333',
          blogTitle: '#c82020',
          linkTitle: '#2975ca',
          smallText: '#757575',
          greadTitle: '#b40101',
          infoTitle: '#0559b3',
        },
        dark: {
          1: '#293145',
          2: '#232a3b',
          3: '#313a55',
          4: '#303748',
          5: '#3f4865',
          6: '#2b3348',
        },
        gray: {
          100: '#f5f5f5',
          200: '#b1b3b0',
          300: '#E8EBF1',
          400: '#A6A6A6',
        },
      },
      backgroundImage: {
        heroBgImg: "url('assets/images/main_bg.png')",
      },
      container: {
        center: true,
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1600px',
      },
      spacing: {
        15: '16%',
        25: '25%',
        30: '30%',
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '48px',
      },
      boxShadow: {
        xs: '0 2px 5px -5px #000000',
        sm: '0 0 5px 0 rgb(0 0 0 / 15%)',
        md: '0 0 5px 0 rgb(0 0 0 / 35%)',
      },
    },
  },
  variants: {
    extend: {
      zIndex: ['responsive', 'hover'],
      position: ['responsive', 'hover'],
      padding: ['responsive', 'last'],
      margin: ['responsive', 'last'],
      borderWidth: ['responsive', 'last'],
      backgroundColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      borderColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      textColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      fill: ['hover', 'focus'],
      display: ['group-hover'],
    },
  },
};
