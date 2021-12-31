module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './backend/**/*.{js,ts,jsx,tsx}',
    './classes/**/*.{js,ts,jsx,tsx}',
    './cloud/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['Montserrat'],
    },
    extend: {
      width: {
        128: '32rem',
      },
      outline: {
        primary: ['2px solid #87F1FF', '3px'],
      },
      colors: {
        background: '#0A0908',
        dark: '#1E1E1F',
        primary: '#87F1FF',
      },
      boxShadow: {
        primary: '0px 0px 37px 3px rgba(135, 241, 255, 0.41)',
        sidebar: '0px 4px 21px rgba(255, 255, 255, 0.1)',
        login: '5px 12px 24px 5px rgba(0, 0, 0, 0.41)',
      },
    },
  },
  plugins: [],
}
