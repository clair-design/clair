const { default: traverse } = require("@babel/traverse");
const { parse } = require("@babel/parser");
const globby = require("globby");
const { resolve, relative, dirname } = require("path");
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs");

const iconsDir = resolve(__dirname, "../src/components/Icon");
const iconSourceDir = resolve(__dirname, "../../icons/icons");
const newIconsDir = resolve(__dirname, "../src/components/Icon/lib");

const iconEntry = resolve(iconsDir, "index.tsx");
const usedTemplateSet = new Set();

const findUsedTemplate = content => {
  const ast = parse(content, {
    sourceType: "module",
    plugins: ["jsx", "typescript"]
  });
  traverse(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value !== "@clair/icons") {
        return;
      }
      const {
        node: { specifiers }
      } = path;
      specifiers.forEach(node => {
        // record the template name
        usedTemplateSet.add(node.imported.name);
      });
    }
  });
};

const getExportedTemplate = content => {
  const ast = parse(content, {
    sourceType: "module",
    plugins: ["typescript"]
  });
  let exportNames = [];
  traverse(ast, {
    ExportDeclaration(path) {
      exportNames = exportNames.concat(
        path.node.declaration.declarations.map(node => node.id.name)
      );
    }
  });
  return exportNames;
};

const getIconSourcePromise = () =>
  globby("*.ts", {
    cwd: iconSourceDir
  }).then(tsFiles => {
    return tsFiles.reduce((acc, file) => {
      const tsLocation = resolve(iconSourceDir, file);
      const tsContent = readFileSync(tsLocation, "utf-8");
      const exportNames = getExportedTemplate(tsContent);
      return [...acc, ...exportNames];
    }, []);
  });

const getUsedTemplateNamePromise = () =>
  globby("**/*.tsx", {
    cwd: iconsDir
  }).then(jsFiles => {
    jsFiles.forEach(file => {
      const fileLocation = resolve(iconsDir, file);
      const fileContent = readFileSync(fileLocation, "utf-8");
      findUsedTemplate(fileContent);
    });
  });

const generateIconContent = iconName => {
  return `
  import { IconContainer, IconProps } from "@components/Icon/lib/Container";
  import { ${iconName} } from "@clair/icons";
  import { getStyleMergedComponent } from "@src/utils";

  export const Icon${iconName} = getStyleMergedComponent<IconProps>({
    template: ${iconName}
  })(IconContainer);
  `;
};

Promise.all([getIconSourcePromise(), getUsedTemplateNamePromise()]).then(
  ([iconSources]) => {
    const leftIcons = iconSources.filter(icon => !usedTemplateSet.has(icon));
    if (!leftIcons.length) {
      return;
    }
    if (!existsSync(newIconsDir)) {
      mkdirSync(newIconsDir);
    }
    const iconFileNameAndComponentNameEntry = leftIcons.map(iconName => [
      iconName,
      iconName
    ]);
    iconFileNameAndComponentNameEntry.forEach(([iconFileName, iconName]) => {
      const iconContent = generateIconContent(iconName);
      const iconComponentDir = resolve(newIconsDir, iconFileName);
      if (!existsSync(iconComponentDir)) {
        mkdirSync(iconComponentDir);
      }
      writeFileSync(resolve(iconComponentDir, "index.tsx"), iconContent);
    });
    const relativePathFromEntryToNewIcons = relative(
      dirname(iconEntry),
      newIconsDir
    );
    const newExportDeclaration = iconFileNameAndComponentNameEntry.reduce(
      (acc, [iconFileName, iconName]) => {
        return `${acc}export { Icon${iconName} } from "./${relativePathFromEntryToNewIcons}/${iconFileName}";\n`;
      },
      "\n"
    );
    const oldEntryContent = readFileSync(iconEntry, "utf-8");
    writeFileSync(iconEntry, `${oldEntryContent}${newExportDeclaration}`);
  }
);
