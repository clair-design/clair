const globby = require("globby");
const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

// import default export in *.d.ts without proper tsconfig.json
// would result in error
// e.g.
// import React from "react";
// the above will throw error
// however
// import * as React from "react";
// this would be a valid usage
globby("dist/**/*.d.ts").then(declarations => {
  declarations.forEach(declaration => {
    const location = resolve(__dirname, "..", declaration);
    const content = readFileSync(location, "utf-8");
    writeFileSync(
      location,
      content.replace(
        /import\s(\w+)(\s[\s\S]*?from\s['"][^'"]+['"];?)/g,
        "import * as $1$2"
      )
    );
  });
});
