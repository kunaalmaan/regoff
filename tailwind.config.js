const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-img': "url('https://ibb.co/Bzt0K7s')"}),
      colors: {
        "light-blue": colors.lightBlue,
        cyan: colors.cyan,
      },
    },
  },
  variants: {},
  plugins: [],
};