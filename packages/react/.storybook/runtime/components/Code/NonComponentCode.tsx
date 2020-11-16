import React, { FC, ReactNode } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

interface NonComponentCodeProps extends ClassNameAndStyle {}

const LANGUAGE_MAP = {
  js: "javascript",
  ts: "typescript",
  shell: "bash"
};

const trimTailingWhiteSpace = (input: ReactNode) => {
  if (typeof input !== "string") {
    return input;
  }
  return input.replace(/\s+$/, "");
};

export const NonComponentCode: FC<NonComponentCodeProps> = ({
  className,
  children
}) => {
  let language: string;
  [language] = className
    ?.split(" ")
    .filter(name => name.startsWith("language"))
    .map(name => name.replace(/^language-/, "")) ?? ["text"];
  // @ts-expect-error
  language = LANGUAGE_MAP[language] ?? language;
  return (
    <SyntaxHighlighter className={className} language={language}>
      {trimTailingWhiteSpace(children)}
    </SyntaxHighlighter>
  );
};
