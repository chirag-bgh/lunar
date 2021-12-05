module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: '#0A0908',
        dark: '#1E1E1F',
        primary: '#87F1FF',
      },
      boxShadow: {
        sidebar: '0px 4px 21px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
