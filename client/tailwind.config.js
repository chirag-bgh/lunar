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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
