const webpackMerge = require("webpack-merge");
const commonWebpackConfig = require("./build/commonWebpack");

module.exports = ({ config }) => {
  return webpackMerge(config, commonWebpackConfig);
};
