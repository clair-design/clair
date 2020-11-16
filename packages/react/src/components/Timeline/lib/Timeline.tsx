import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const positions = ["left", "center", "right"] as const;
export type position = typeof positions[number];
const Placement = PropTypes.oneOf([...positions]);

export const Timeline: React.FC<TimelineProps> = props => {
  const { placement = "left", children } = props;
  return (
    <ul
      className={classNames("c-timeline", {
        [`c-timeline--${placement}`]: positions.includes(placement as position)
      })}
    >
      {children}
    </ul>
  );
};

Timeline.propTypes = {
  placement: Placement,
  children: PropTypes.node.isRequired
};

export interface TimelineProps {
  placement?: string;
  children: React.ReactNode;
}
