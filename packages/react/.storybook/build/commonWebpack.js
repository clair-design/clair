const path = require("path");
const theme = process.env.THEME || "default";
let themeDir = "";
try {
  themeDir = path.dirname(
    require.resolve(`@clair/theme-${theme}/package.json`)
  );
} catch (e) {
  themeDir = path.dirname(require.resolve(`@clair/theme-default/package.json`));
}

const { alias } = require("../../build/alias");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss", ".mdx"],
    alias: { ...alias, THEME_ENTRY: `${themeDir}/styles/index.scss` }
  },
  module: {
    rules: [
      {
        test: /\.([jt])sx?$/,
        include: [
          path.resolve(__dirname, "../runtime"),
          path.resolve(__dirname, "../../src")
        ],
        use: [
          "cache-loader",
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              babelrc: false,
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loose: true }]
              ]
            }
          },
          {
            loader: "eslint-loader",
            options: {
              cache: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.mdx$/,
        include: [
          path.resolve(__dirname, "../runtime"),
          path.resolve(__dirname, "../../examples")
        ],
        use: [
          "cache-loader",
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              configFile: false,
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loose: true }]
              ]
            }
          },
          {
            loader: require.resolve("../loader/frontmatter-loader.js")
          },
          {
            loader: "@mdx-js/loader",
            options: {
              remarkPlugins: [require("../plugin/remark-codeblock")]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
