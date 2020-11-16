// original: https://github.com/some1else/mdx-frontmatter-loader/blob/master/index.js
const frontmatter = require("front-matter");
const fs = require("fs");

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const content = fs.readFileSync(this.resource).toString();
  const { attributes } = frontmatter(content);

  if (!attributes.title) {
    const m = content.match(/(\n|^)#\s([^\r\n]+)/);
    attributes.title = m ? m[2].trim() : "Unknown Title";
  }

  const modifiedSource = `
    ${source};\n
    export const attributes = ${JSON.stringify(attributes)};\n
  `;
  return modifiedSource;
};
