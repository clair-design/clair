import classNames from "classnames";
import React, { HTMLAttributes, useContext } from "react";
import PropTypes from "prop-types";
import { LayoutContext } from "./Layout";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  fixed?: boolean;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { fixed = false, className, ...rest } = props;
  const { isScrollMain } = useContext(LayoutContext);

  const blockName = "c-layout__header";
  const cls = classNames(blockName, className, {
    [`${blockName}--fixed`]: fixed && !isScrollMain
  });

  return (
    <header className={cls} {...rest}>
      {props.children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Header.displayName = "Header";

export { Header };
