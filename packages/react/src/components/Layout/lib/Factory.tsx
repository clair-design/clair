import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export type BaseProps = React.HTMLAttributes<HTMLElement>;

export function generateComponent(
  displayName: string,
  tagName: string,
  baseClassName: string
) {
  const Component: React.FC<BaseProps> = (props: BaseProps) => {
    const { className, children, ...rest } = props;
    const cls = classNames(baseClassName, className);
    return React.createElement(tagName, { className: cls, ...rest }, children);
  };

  Component.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object
  };

  Component.displayName = displayName;

  return Component;
}
