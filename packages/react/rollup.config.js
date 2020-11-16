import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default [
  {
    input: "dist/esm/index.js",
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "ClairReact"
    },
    plugins: [resolve(), commonjs()],
    external: ["react", "react-dom"],
    context: "window"
  }
];
