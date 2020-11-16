// @ts-check
const { spawn } = require("child_process");
const { resolve } = require("path");
const { output, folder } = require("../svg.config");
const args = process.argv.slice(2);

const config = resolve(__dirname, "../.svgo.yml");

spawn(
  "yarn",
  [
    "svgo",
    `--config=${config}`,
    "--pretty",
    "--indent=2",
    "-o",
    output,
    "-f",
    folder,
    ...args
  ],
  {
    stdio: "inherit",
    shell: true
  }
);
