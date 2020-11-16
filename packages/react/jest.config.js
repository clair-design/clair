const globby = require("globby");
const { resolve, dirname, join, relative } = require("path");
require("core-js/features/array/flat");
const { pipe } = require("ramda");
const startIndex = 3;
const fileNames = process.argv
  .slice(startIndex)
  .filter(arg => !arg.startsWith("-"));

const components = resolve(__dirname, "src/components");
const utils = resolve(__dirname, "src/utils");

const getComponentDir = fileName =>
  [components, utils]
    .map(dir =>
      globby
        .sync(fileName, {
          cwd: dir
        })
        .map(location => join(dir, location))
    )
    .flat();

const results = fileNames.map(getComponentDir).flat();

const collectCoverageFrom = results.length
  ? {
      collectCoverageFrom: pipe(
        // make directory path case sensitive
        locations =>
          locations.map(location => {
            // only handle for component case
            // e.g. `src/components/tabs` -> `src/components/Tabs`
            const caseSensitiveLocation = location.replace(
              new RegExp(`(${components}/)([^/]+)`),
              (match, prefix, componentName) => {
                const titledComponentName =
                  componentName[0].toUpperCase() + componentName.slice(1);
                return `${prefix}${titledComponentName}`;
              }
            );
            const relativePath = relative(__dirname, caseSensitiveLocation);
            return `${dirname(relativePath)}/**/*.{ts,tsx}`;
          }),
        // dedupe
        locations => new Set(locations),
        Array.from
      )(results)
    }
  : {};

module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^@src(.*)?": `${__dirname}/src$1`,
    "^@components(.*)?": `${__dirname}/src/components$1`,
    "^@utils(.*)?": `${__dirname}/src/utils$1`
  },
  testPathIgnorePatterns: ["/node_modules/", "\\.cache", "dist"],
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transformIgnorePatterns: ["node_modules/(?!(lodash-es|react-use))"],
  ...collectCoverageFrom
};
