import React from "react";
import classNames from "classnames";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

interface FolderProps extends ClassNameAndStyle {
  opened: boolean;
}

export const Folder: React.FC<FolderProps> = props => {
  const { opened, children, className } = props;
  const node = <SyntaxHighlighter language="jsx">{children}</SyntaxHighlighter>;
  return (
    <div
      className={classNames("react-demo__source-code", className)}
      style={{
        maxHeight: opened ? "100vh" : 0,
        overflowY: "auto",
        opacity: opened ? 1 : 0
      }}
    >
      {node}
    </div>
  );
};
