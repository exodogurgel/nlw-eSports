/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif',]
    },
    extend: {
      backgroundImage: {
        galaxy: "url('background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(90deg, #9572FC 0%, #43E7AD 50.00%, #E1D55D 100%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
      }
      })
    })
  ],
}
