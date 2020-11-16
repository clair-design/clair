import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/react";
import React, { PropsWithChildren } from "react";
import { Code } from "../Code";

interface Props {
  children: React.ReactNode;
}

const Pre: React.FC<PropsWithChildren<object>> = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

const Layout = (props: Props): React.ReactElement => {
  return (
    <MDXProvider components={{ Helmet, code: Code, pre: Pre }}>
      <div className="s-main markdown-body" {...props} />
    </MDXProvider>
  );
};

export default Layout;
