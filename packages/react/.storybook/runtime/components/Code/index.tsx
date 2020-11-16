import React, { useState, useMemo, useRef, useEffect } from "react";
// @ts-ignore
import indent from "indent";
import classNames from "classnames";
import { Folder } from "./Folder";
import { NonComponentCode } from "./NonComponentCode";
import * as Clair from "@src/index";

const isFunctionOrClass = (children: string): boolean => {
  const trimmedChildren = children.trim();
  const functionClassRegExp = /^(?:function|const|let|Class)/;
  return functionClassRegExp.test(trimmedChildren);
};

const getFunctionOrClassName = (children: string): string => {
  const trimmedChildren = children.trim();
  const functionClassRegExp = /^(?:function|const|let|Class)\s+?([a-zA-Z]+)/;
  const [, name = "div"] = trimmedChildren.match(functionClassRegExp) || [];
  return name;
};

const componentEntries = Object.entries(Clair);
const componentNames: string[] = componentEntries.map(([name]) => name);
const components = componentEntries.map(([, component]) => component);

// export Clair to the function context
const componentsDeclaration: string = componentNames.reduce((last, key) => {
  last += `const ${key} = Clair.${key};\n`;
  return last;
}, "");

const getRenderString = (componentName: string) =>
  `ReactDOM.render(<${componentName} />, document.getElementById("app"));`;

const getComponentBody = (children: string, componentName?: string) => {
  if (!componentName) {
    return children
      .split("\n")
      .map((line, lineNumber) => {
        if (lineNumber === 0) {
          return line;
        }
        return indent(line, 2);
      })
      .join("\n");
  }
  return `
  function ${componentName} () {
    return (
      ${children
        .split("\n")
        .map((line, lineNumber) => {
          if (lineNumber === 0) {
            return line;
          }
          return indent(line, 6);
        })
        .join("\n")}
    )
  }
  `;
};

interface CodeProps extends ClassNameAndStyle {
  children: string;
  live?: "true" | "false";
  deps?: string;
  metastring?: string;
}

// compiled code is passed thru metastring (at the end)
// something like compiled=xxx
const compiledRedExp = /compiled=([\s\S]+)$/;

export const Code: React.FC<CodeProps> = ({
  children,
  className,
  deps,
  live = "false",
  metastring = ""
}) => {
  if (live === "false") {
    return (
      <NonComponentCode className={className}>{children}</NonComponentCode>
    );
  }
  const [, compiled = ""] = metastring.match(compiledRedExp) || [];
  const [importDeps, updateImportDeps] = useState<string[]>(
    deps ? deps.split(",") : []
  );

  const [opened, updateOpened] = useState<boolean>(false);
  // mark which component has been consumed
  const importDepsRef = useRef<string[]>(deps ? deps.split(",") : []);
  useEffect(() => {
    if (importDepsRef.current.length) {
      updateImportDeps([...importDepsRef.current]);
      importDepsRef.current = [];
    }
  });
  const h = (
    component: Parameters<typeof React.createElement>[0] &
      typeof components[number],
    props: Parameters<typeof React.createElement>[1],
    ...c: React.ReactNode[]
  ) => {
    const index = components.indexOf(component);
    if (index > -1) {
      const componentName = componentNames[index];
      const { current: lastImportDeps } = importDepsRef;
      if (!lastImportDeps.includes(componentName)) {
        lastImportDeps.push(componentName);
      }
    }
    return React.createElement(
      component as Parameters<typeof React.createElement>[0],
      props,
      ...c
    );
  };
  const isComponent: boolean = isFunctionOrClass(children);
  const childrenDeclaration: string = isComponent ? compiled : "";
  const componentName: string = isComponent
    ? getFunctionOrClassName(children)
    : "App";
  const code: string = isComponent
    ? `h(${getFunctionOrClassName(children)})`
    : compiled;

  const wholeCodeBlock = `
  import React from "react";
  import ReactDOM from "react-dom";
  import { ${importDeps.join(", ")} } from "@clair/react";
  ${getComponentBody(children, isComponent ? "" : componentName)}
  ${getRenderString(componentName)}
  `;

  const node = useMemo(() => {
    return new Function(
      "Clair",
      "React",
      "h",
      `
        ${componentsDeclaration}
        ${childrenDeclaration}
        return ${code};
        `
    )(Clair, React, h);
  }, [childrenDeclaration, Clair]);

  return (
    <div className={classNames(className, "react-demo")}>
      <div className={classNames(className, "react-demo__live")}>{node}</div>
      <Clair.Button
        className="react-demo__toggle"
        block
        onClick={() => updateOpened(!opened)}
      >
        <Clair.IconArrowDown
          className={classNames("react-demo__button", {
            "react-demo__button-up": opened,
            "react-demo__button-down": !opened
          })}
        />
      </Clair.Button>
      <Folder opened={opened}>{wholeCodeBlock}</Folder>
    </div>
  );
};
