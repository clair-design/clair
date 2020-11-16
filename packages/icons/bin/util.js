require("core-js/features/array/flat-map");
const { basename } = require("path");

exports.getComponentName = fileLocation => {
  const name = basename(fileLocation, ".svg");
  // remove ic_
  return name
    .split("_")
    .flatMap(item => item.split("-"))
    .filter(part => part !== "ic")
    .map(item => item.replace(/^\w/, char => char.toUpperCase()))
    .join("");
};
