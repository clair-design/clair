import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BreadcrumbContext } from "./Context";

function hasTag(node: React.ReactNode, tag = "a") {
  const elem = node as React.ReactElement;
  if (!elem) return false;
  if (elem.type === tag) return true;
  if (!elem.props) return false;
  if (!Array.isArray(elem.props.children)) return false;
  return elem.props.children.some((child: React.ReactElement) =>
    hasTag(child, tag)
  );
}

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  href?: string;
  children?: React.ReactNode;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = props => {
  const { children, href, ...rest } = props;
  const context = useContext(BreadcrumbContext);
  const separator = context.separator || "/";
  const hasATag = Array.isArray(children)
    ? children.some(c => hasTag(c))
    : hasTag(children);
  const tabIndex = href && !hasATag ? 0 : undefined;
  const role = href || hasATag ? "link" : undefined;
  const link = href ? <a href={href}>{children}</a> : children;

  return (
    <span className="c-breadcrumb__item">
      <span role={role} tabIndex={tabIndex} {...rest}>
        {link}
      </span>
      <span className="c-breadcrumb__separator">{separator}</span>
    </span>
  );
};

BreadcrumbItem.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
};

BreadcrumbItem.displayName = "BreadcrumbItem";
