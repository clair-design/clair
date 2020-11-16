const { resolve, relative, join } = require("path");
const { writeFileSync, readFileSync } = require("fs");
const dist = resolve(__dirname, "../dist");
const types = resolve(__dirname, "../types");
const entry = resolve(dist, "esm/index.d.ts");
const relativePath = relative(resolve(dist, "esm"), types);

// so that the emitted code would have correct type reference
const reference = `
/// <reference path="${join(relativePath, "classNameAndStyle.d.ts")}" />
/// <reference path="${join(relativePath, "util.d.ts")}" />
\n
`;
const content = readFileSync(entry, "utf-8");
writeFileSync(
  entry,
  `${reference}${content.replace(new RegExp(reference, "g"), "")}`
);
