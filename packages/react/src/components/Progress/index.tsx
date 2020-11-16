import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { LineBar } from "./lib/LineBar";
import { CircleBar } from "./lib/CircleBar";
import { TextContent } from "./lib/TextContent";

import {
  ProgressProps,
  PType,
  PSize,
  PStatus,
  PText,
  WrapStyle,
  TextWrapStyle,
  CIRCLE_PROGRESS_RATIO_OF_FONT_SIZE_AND_WIDTH,
  MAX_DEFAULT,
  VALUE_DEFAULT,
  TYPE_DEFAULT,
  SIZE_DEFAULT,
  STATUS_DEFAULT,
  SHOW_INFO_DEFAULT
} from "./lib/constant";

import { getValidWidth } from "./lib/utils";
export const Progress: React.FC<ProgressProps> = props => {
  const {
    max = MAX_DEFAULT,
    value = VALUE_DEFAULT,
    type = TYPE_DEFAULT,
    size = SIZE_DEFAULT,
    status = STATUS_DEFAULT,
    showInfo = SHOW_INFO_DEFAULT,
    width,
    strokeWidth,
    strokeColor,
    infoWidth,
    customInfo
  } = props;

  const validWidth = getValidWidth(type, size, width);
  const textFontSize =
    type === "circle"
      ? Math.floor(validWidth * CIRCLE_PROGRESS_RATIO_OF_FONT_SIZE_AND_WIDTH)
      : "";

  const className: string = classNames("c-progress", `c-progress--${type}`, {
    [`c-progress--${size}`]: size === "normal",
    [`c-progress--${status}`]: status === "normal"
  });

  const wrapStyle: WrapStyle = {
    width: validWidth === 0 ? "" : `${validWidth}px`,
    height: type === "circle" ? `${validWidth}px` : ""
  };
  const textWrapStyle: TextWrapStyle = {
    width: type === "circle" ? "" : `${infoWidth}px`,
    fontSize: `${textFontSize}px`
  };

  return (
    <div
      className={className}
      style={wrapStyle}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {type === "circle" ? (
        <CircleBar
          width={width}
          strokeWidth={strokeWidth}
          size={size}
          value={value}
          max={max}
          strokeColor={strokeColor}
        />
      ) : (
        <LineBar
          strokeWidth={strokeWidth}
          size={size}
          value={value}
          max={max}
          strokeColor={strokeColor}
        />
      )}
      {showInfo ? (
        <div className="c-progress__text" style={textWrapStyle}>
          <TextContent
            value={value}
            max={max}
            type={type}
            size={size}
            status={status}
            customInfo={customInfo}
          />
        </div>
      ) : null}
    </div>
  );
};

Progress.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number,
  type: PType,
  size: PSize,
  status: PStatus,
  width: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  showInfo: PropTypes.bool,
  infoWidth: PropTypes.number,
  customInfo: PText
};

Progress.displayName = "Progress";
