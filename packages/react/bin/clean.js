const rimraf = require("rimraf");
const { resolve } = require("path");

const folders = [
  resolve(__dirname, "../dist"),
  resolve(__dirname, "../public")
];
folders.forEach(folder => {
  rimraf(folder, err => {
    if (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  });
});
