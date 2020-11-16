const { readdirSync, readFileSync, writeFileSync } = require("fs");
const cheerio = require("cheerio");
const { resolve, extname, basename } = require("path");
const inquirer = require("inquirer");
const { mkdirSync, existsSync } = require("fs");

const { getComponentName } = require("./util");
const { output, tsFolder: tsFolderLocation } = require("../svg.config");

const useCurrentColor = content => {
  const fillRegExp = /(fill=)"#.*?"/gi;
  const strokeRegExp = /(stroke=)"#.*?"/gi;
  return content
    .replace(fillRegExp, `$1"currentColor"`)
    .replace(strokeRegExp, `$1"currentColor"`);
};

const readAllSvg = () =>
  readdirSync(output)
    .filter(file => extname(file) === ".svg")
    .map(svg => {
      const location = resolve(output, svg);
      return [location, readFileSync(location, "utf-8")];
    });

const updateCurrentColor = ([location, content]) => {
  return [location, useCurrentColor(content)];
};

// certain elements are unwanted
// here to remove all of them
const shapeElements = ([location, content]) => {
  const $ = cheerio.load(content);
  $("defs").remove();
  $("mask").remove();
  // $("rect").remove();
  $("[opacity]").remove();
  $("[xlink]").each((_, element) => {
    const $el = $(element);
    $el.attr("xlink", null);
  });
  const html = cheerio.html($("svg"));
  const newHTML = html
    .split("\n")
    .filter(item => item.trim())
    .join("\n");
  return [location, newHTML];
};

const logDiff = (oldName, newName) => {
  console.log(`${oldName} -> ${newName}`);
};

const generateTs = ([location, content]) => {
  const componentName = getComponentName(location);
  const assignment = `export const ${componentName} = \`\n${content.trim()}\`;\n`;
  if (!existsSync(tsFolderLocation)) {
    mkdirSync(tsFolderLocation);
  }
  writeFileSync(resolve(tsFolderLocation, `${componentName}.ts`), assignment);
  const oldName = basename(location, ".svg");
  logDiff(`${oldName}.svg`, `${componentName}.ts`);
};

// core
readAllSvg()
  .map(updateCurrentColor)
  .map(shapeElements)
  .forEach(generateTs);

const questions = [
  {
    type: "confirm",
    name: "rename",
    message: "Do you want to rename the generated ts files?",
    default: true
  }
];

// maybe rename?
inquirer.prompt(questions).then(answers => {
  const { rename } = answers;
  if (rename) {
    require("./rename");
  } else {
    require("./generateEntry");
  }
});
