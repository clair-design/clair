const { resolve, basename, relative, join } = require("path");
const { readdirSync, writeFileSync } = require("fs");
const { tsFolder } = require("../svg.config");
const entryFolder = resolve(__dirname, "..");
const entryFile = resolve(entryFolder, "index.ts");

const entryContent = readdirSync(tsFolder).reduce((last, tsFile) => {
  const fileName = basename(tsFile, ".ts");
  const relativePath = relative(entryFolder, tsFolder);
  const exportDeclaration = `export { ${fileName} } from "./${join(
    relativePath,
    fileName
  )}";`;
  return last + exportDeclaration + "\n";
}, "");

writeFileSync(entryFile, entryContent);
