const path = require("path");
const fs = require("fs");
const argv = process.argv;
let outPath = "";

if (argv.length <= 2) {
  throw "ERROR: Specify the output address of the file to be processed";
} else {
  if (argv[2] === "-p") {
    outPath = argv[3];
  }
}

const iconDir = path.resolve(__dirname, "../icons");
const svgDir = path.resolve(__dirname, `../${outPath}/icons-svg`);

isThereDir(svgDir);

console.log(iconDir, svgDir);

fs.readdir(iconDir, "utf8", (error, data) => {
  if (error) {
    throw error;
  } else {
    data.forEach((item, index) => {
      const readPath = path.resolve(iconDir, item);
      fs.readFile(readPath, "utf8", (err, file) => {
        if (err) {
          throw err;
        } else {
          const arr = file.split("`");
          const content = arr[1];
          const outPath = path.resolve(
            svgDir,
            item.replace(".ts", "") + ".svg"
          );
          console.log(outPath);
          fs.writeFile(outPath, content, "utf8", er => {
            if (er) {
              throw er;
            }
          });
        }
      });
    });
  }
});

function isThereDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0744);
  }
}
