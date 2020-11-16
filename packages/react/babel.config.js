// babel.config.js
module.exports = api => {
  const isTest = api.env("test") || process.env.test === "true";
  if (!isTest) {
    return {};
  }
  return {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
      "@babel/preset-react"
    ],
    plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]]
  };
};
