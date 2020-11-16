const path = require("path");
exports.alias = {
  "@src": path.resolve(__dirname, "../src"),
  "@styles": path.resolve(__dirname, "../clair-styles"),
  "@components": path.resolve(__dirname, "../src/components"),
  "@assets": path.resolve(__dirname, "../assets"),
  "@utils": path.resolve(__dirname, "../src/utils"),
  "@examples": path.resolve(__dirname, "../examples"),
  "@storybookRuntime": path.resolve(__dirname, "../.storybook/runtime/"),
  "@clair/react": path.resolve(__dirname, "../src/index.ts")
};
