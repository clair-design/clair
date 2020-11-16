const { resolve, basename, dirname } = require("path");
const { promisify } = require("util");
const globby = require("globby");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonWebpackConfig = require("./commonWebpack");

const rimrafP = promisify(require("rimraf"));

const absp = (...args) => resolve(__dirname, ...args);
const outputDirectory = absp("../dist");

const getWebpackConfig = ({ entry }) =>
  webpackMerge(commonWebpackConfig, {
    entry,
    output: {
      path: outputDirectory,
      libraryTarget: "umd2"
    },
    mode: "production",
    optimization: {
      minimize: false
    },
    externals: [/^@mdx-js\//i, "@clair/react", /^[a-z]/i],
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
  });

const opt = { cwd: __dirname };
const entries = globby.sync(absp("../../examples/**/index.mdx"), opt);

const entry = entries.reduce(
  (acc, fullPath) => {
    acc[basename(dirname(fullPath))] = fullPath;
    return acc;
  },
  {
    runtimeCore: absp("../runtime/core.js")
  }
);

rimrafP(outputDirectory).then(() => {
  webpack(getWebpackConfig({ entry }), (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true // Shows colors in the console
      })
    );
  });
});
