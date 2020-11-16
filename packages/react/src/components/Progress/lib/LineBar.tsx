import React from "react";
import PropTypes from "prop-types";

import {
  LineBarProps,
  DOUBLE,
  PSize,
  MAX_DEFAULT,
  VALUE_DEFAULT,
  SIZE_DEFAULT
} from "./constant";
import { getValidStrokeWidth, getPercentage } from "./utils";

export const LineBar: React.FC<LineBarProps> = props => {
  const {
    max = MAX_DEFAULT,
    value = VALUE_DEFAULT,
    size = SIZE_DEFAULT,
    strokeWidth,
    strokeColor
  } = props;
  const type = "line";
  const validStrokeWidth = getValidStrokeWidth(type, size, strokeWidth);
  const percentage = getPercentage(value, max);
  const borderRadius = `${validStrokeWidth / DOUBLE}px`;
  const bgStyle = {
    height: `${validStrokeWidth}px`,
    borderRadius
  };
  const innerStyle = {
    width: `${percentage}%`,
    borderRadius,
    backgroundColor: strokeColor
  };

  return (
    <div className="c-progress__bg" style={bgStyle}>
      <div className="c-progress__inner" style={innerStyle} />
    </div>
  );
};

LineBar.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number,
  size: PSize,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string
};

LineBar.displayName = "LineBar";
