import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const sizes = ["normal", "small"] as const;
export type Size = typeof sizes[number];
const PSize = PropTypes.oneOf([...sizes]);

export interface CardProps {
  title?: React.ReactNode;
  size?: Size;
  raised?: boolean;
  actions?: React.ReactNode;
  cover?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = props => {
  const {
    title,
    size = "normal",
    raised = false,
    actions,
    cover,
    children
  } = props;
  const className: string = classNames("c-card", {
    [`c-card--${size}`]: sizes.includes(size) && size !== "normal",
    "c-card--raised": raised
  });
  const Cover = cover ? <div className="c-card__cover">{cover}</div> : null;
  const Title = title ? <h3 className="c-card__title">{title}</h3> : null;
  const Actions = actions ? (
    <div className="c-card__action">{actions}</div>
  ) : null;
  const Header =
    Title || Actions ? (
      <div className="c-card__header">
        {Title}
        {Actions}
      </div>
    ) : null;
  const Body = children ? <div className="c-card__body">{children}</div> : null;
  return (
    <div className={className}>
      {Cover}
      {Header}
      {Body}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  size: PSize,
  raised: PropTypes.bool,
  actions: PropTypes.node,
  cover: PropTypes.node,
  children: PropTypes.node
};

Card.displayName = "Card";
