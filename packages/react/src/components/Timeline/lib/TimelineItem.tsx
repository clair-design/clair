import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const TimelineItem: React.FC<TimelineItemProps> = props => {
  const { solid, color, children, icon } = props;
  const nodeStyle = {
    color
  };
  return (
    <li
      className={classnames("c-timeline-item", {
        "c-timeline-item--has-icon": icon
      })}
    >
      <div
        className={classnames("c-timeline-item__node", {
          "c-timeline-item__node--solid": solid
        })}
        style={nodeStyle}
      >
        {icon}
      </div>
      <div className="c-timeline-item__content">{children}</div>
    </li>
  );
};

TimelineItem.propTypes = {
  color: PropTypes.string,
  solid: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired
};

export interface TimelineItemProps {
  color?: string;
  solid?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
