import React, { Fragment, ReactNode, useMemo } from "react";
import PropTypes from "prop-types";

import {
  IconStatusDanger,
  IconStatusSuccess,
  IconClose,
  IconChecked
} from "@components/Icon";

import {
  TextContentProps,
  PType,
  PSize,
  Status,
  PStatus,
  PText,
  CIRCLE_NORMAL_ICON_STROKE_WIDTH,
  CIRCLE_SMALL_ICON_STROKE_WIDTH,
  LINE_ICON_STROKE_WIDTH,
  TYPE_DEFAULT,
  SIZE_DEFAULT,
  STATUS_DEFAULT,
  MAX_DEFAULT,
  VALUE_DEFAULT
} from "./constant";
import { getPercentage } from "./utils";

export const TextContent: React.FC<TextContentProps> = props => {
  const {
    customInfo,
    size = SIZE_DEFAULT,
    status = STATUS_DEFAULT,
    type = TYPE_DEFAULT,
    max = MAX_DEFAULT,
    value = VALUE_DEFAULT
  } = props;

  const circleIconStyle = {
    strokeWidth:
      size === "small"
        ? CIRCLE_SMALL_ICON_STROKE_WIDTH
        : CIRCLE_NORMAL_ICON_STROKE_WIDTH
  };
  const lineIconStyle = { strokeWidth: LINE_ICON_STROKE_WIDTH };
  let textContent = null;

  const textMap: {
    [key in Status]?: {
      circle: ReactNode;
      line: ReactNode;
    };
  } = useMemo(() => {
    return {
      exception: {
        circle: <IconClose style={circleIconStyle} />,
        line: <IconStatusDanger style={lineIconStyle} />
      },
      success: {
        circle: <IconChecked style={circleIconStyle} />,
        line: <IconStatusSuccess style={lineIconStyle} />
      }
    };
  }, [circleIconStyle, lineIconStyle]);

  const defaultTextContent = `${Math.floor(getPercentage(value, max))}%`;

  if (customInfo) {
    textContent = customInfo;
  } else {
    textContent = textMap[status]?.[type] ?? defaultTextContent;
  }

  return <Fragment>{textContent}</Fragment>;
};

TextContent.propTypes = {
  type: PType,
  size: PSize,
  status: PStatus,
  max: PropTypes.number,
  value: PropTypes.number,
  customInfo: PText
};

TextContent.displayName = "TextContent";
