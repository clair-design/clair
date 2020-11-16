import React from "react";
import PropTypes from "prop-types";

import {
  CircleBarProps,
  VIEWBOX_SIZE,
  SVG_BASE_RADIUS,
  DOUBLE,
  PERCENTAGE_VALUE,
  PSize,
  MAX_DEFAULT,
  VALUE_DEFAULT,
  SIZE_DEFAULT
} from "./constant";
import {
  getPercentage,
  getValidWidth,
  getValidStrokeWidth,
  toFixed
} from "./utils";

export const CircleBar: React.FC<CircleBarProps> = props => {
  const {
    max = MAX_DEFAULT,
    value = VALUE_DEFAULT,
    size = SIZE_DEFAULT,
    width,
    strokeWidth,
    strokeColor
  } = props;
  const type = "circle";
  const percentage = getPercentage(value, max);
  const validWidth = getValidWidth(type, size, width);
  const validStrokeWidth = getValidStrokeWidth(type, size, strokeWidth);

  const relativeStrokeWidth = toFixed(
    (validStrokeWidth / validWidth) * VIEWBOX_SIZE
  );
  const relativeR = toFixed(SVG_BASE_RADIUS - relativeStrokeWidth / DOUBLE);
  const circleLen = DOUBLE * Math.PI * relativeR;
  const lineLen = (percentage / PERCENTAGE_VALUE) * circleLen;
  const relativeStrokeDasharray = `${toFixed(lineLen)} ${toFixed(circleLen)}`;
  return (
    <svg
      className="c-progress__circle"
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
    >
      <circle
        className="c-progress__bg"
        cx={SVG_BASE_RADIUS}
        cy={SVG_BASE_RADIUS}
        r={relativeR}
        strokeWidth={relativeStrokeWidth}
        fill="none"
      />
      <circle
        className="c-progress__inner"
        cx={SVG_BASE_RADIUS}
        cy={SVG_BASE_RADIUS}
        r={relativeR}
        style={{ stroke: strokeColor }}
        strokeWidth={relativeStrokeWidth}
        strokeDasharray={relativeStrokeDasharray}
        fill="none"
      />
    </svg>
  );
};

CircleBar.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number,
  size: PSize,
  width: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string
};

CircleBar.displayName = "CircleBar";
