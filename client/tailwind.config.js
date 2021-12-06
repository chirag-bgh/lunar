module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Montserrat'],
    },
    extend: {
      colors: {
        background: '#0A0908',
        dark: '#1E1E1F',
        // grey: '#404040',
        primary: '#87F1FF',
      },
      boxShadow: {
        primary: '0px 0px 37px 3px rgba(135, 241, 255, 0.41)',
        sidebar: '0px 4px 21px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
