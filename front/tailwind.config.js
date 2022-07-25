/* eslint-disable */
module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: '#890000',
        lighterTextColor: '#DE9C9C',
        whiteSmoke: "#F5F5F5",
        inputBgColor: "#F4F6F9",
        subBgColor: '#F3D6D6',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
