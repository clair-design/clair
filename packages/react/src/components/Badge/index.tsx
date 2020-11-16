import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  value?: React.ReactNode;
  max?: number;
  isDot?: boolean;
  hidden?: boolean;
  backgroundColor?: string;
  children?: React.ReactNode;
}
export function isColorValid(color: string) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}
export const Badge: React.FC<BadgeProps> = props => {
  const DEFAULT_MAX = 99;
  const {
    style,
    value,
    max = DEFAULT_MAX,
    isDot = false,
    hidden = false,
    backgroundColor,
    children,
    ...rest
  } = props;
  let content;
  if (typeof value === "number") {
    content = value > max ? `${max}+` : value;
  } else {
    content = value;
  }
  content = isDot ? "" : content;
  const badgeClassName = classNames(classNames, "c-badge__content", {
    "c-badge__content--dot": isDot,
    "c-badge__content--hidden": hidden,
    "c-badge__content--empty": children === undefined
  });
  const contentStyle =
    backgroundColor && isColorValid(backgroundColor)
      ? {
          ...style,
          backgroundColor: backgroundColor
        }
      : style;
  return (
    <div className="c-badge" {...rest}>
      {children}
      <span className={badgeClassName} style={contentStyle}>
        {content}
      </span>
    </div>
  );
};

Badge.propTypes = {
  value: PropTypes.node,
  max: PropTypes.number,
  isDot: PropTypes.bool,
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object
};

Badge.displayName = "Badge";
