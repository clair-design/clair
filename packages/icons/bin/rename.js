const inquirer = require("inquirer");
const gloabby = require("globby");
const { readFileSync, writeFileSync, renameSync, readdirSync } = require("fs");
const { resolve, basename } = require("path");
const {
  folder: svgSource,
  tsFolder: tsFolderLocation
} = require("../svg.config");
const { getComponentName } = require("./util");

const questions = [
  {
    type: "input",
    name: "pattern",
    message:
      "Enter the glob pattern that you want to match (the pattern of ts files' name)"
  },
  {
    type: "checkbox",
    name: "names",
    message:
      "Choose file(s) that you want to rename(press space to select, enter to confirm)",
    choices(answers) {
      const { pattern } = answers;
      const formattedPattern = pattern.replace(/\**$/, "").replace(/\.ts$/, "");
      const newPattern = `${formattedPattern}*.ts`;
      return [new inquirer.Separator("Choices")].concat(
        gloabby
          .sync(newPattern, {
            cwd: tsFolderLocation
          })
          .map(file => basename(file, ".ts"))
          .map(name => {
            return { name, value: name };
          })
      );
    }
  }
];

inquirer
  .prompt(questions)
  .then(answers => {
    const { names } = answers;
    return names;
  })
  .then(names => {
    const nameQuestions = names.map(name => {
      return {
        type: "input",
        name,
        message: `Enter the new name for '${name}'`
      };
    });
    return inquirer.prompt(nameQuestions);
  })
  .then(answers => {
    const oldAndNewNameEntries = Object.entries(answers);
    // rename ts files
    oldAndNewNameEntries.forEach(([name, newName]) => {
      const fileLocation = resolve(tsFolderLocation, `${name}.ts`);
      const content = readFileSync(fileLocation, "utf-8");
      const regExp = new RegExp(name, "g");
      const newContent = content.replace(regExp, newName);
      writeFileSync(fileLocation, newContent);
      renameSync(fileLocation, resolve(tsFolderLocation, `${newName}.ts`));
    });
    // update entry
    require("./generateEntry");
    // writeFileSync(projectEntry, newEntryContent);
    // rename source svg, so won't need to rename ts files every time
    readdirSync(svgSource).forEach(svg => {
      const componentName = getComponentName(svg);
      const pair = oldAndNewNameEntries.find(
        ([name]) => name === componentName
      );
      if (!pair) {
        return;
      }
      const [, newName] = pair;
      renameSync(resolve(svgSource, svg), resolve(svgSource, `${newName}.svg`));
    });
  });
