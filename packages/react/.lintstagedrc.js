module.exports = {
  "*.{js,ts,tsx}": "eslint --fix",
  "src/**/*.{ts,tsx}": () => "yarn type-check",
  "(*.{ts,tsx}|package.json)": () => "yarn test"
};
