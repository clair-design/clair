import React from "react";
import PropTypes from "prop-types";

const types = ["line", "circle"] as const;
export type Type = typeof types[number];
export const PType = PropTypes.oneOf([...types]);

const sizes = ["normal", "small"] as const;
export type Size = typeof sizes[number];
export const PSize = PropTypes.oneOf([...sizes]);

const statuses = ["normal", "active", "success", "exception"] as const;
export type Status = typeof statuses[number];
export const PStatus = PropTypes.oneOf([...statuses]);

type Text = React.ReactNode;
export const PText = PropTypes.node;

export type WrapStyle = {
  width?: string;
  height?: string;
};
export type TextWrapStyle = {
  width?: string;
  fontSize?: string;
};

export interface ProgressProps {
  max?: number;
  value?: number;
  type?: Type;
  size?: Size;
  status?: Status;
  width?: number;
  strokeWidth?: number;
  strokeColor?: string;
  showInfo?: boolean;
  infoWidth?: number;
  customInfo?: Text;
}

export interface LineBarProps {
  strokeWidth?: number;
  max?: number;
  value?: number;
  size?: Size;
  strokeColor?: string;
}

export interface CircleBarProps {
  max?: number;
  value?: number;
  size?: Size;
  width?: number;
  strokeWidth?: number;
  strokeColor?: string;
}

export interface TextContentProps {
  max?: number;
  value?: number;
  type?: Type;
  size?: Size;
  status?: Status;
  customInfo?: Text;
}

export const DOUBLE: number = 2;
export const PERCENTAGE_VALUE: number = 100;
// eslint-disable-next-line
export const CIRCLE_PROGRESS_RATIO_OF_FONT_SIZE_AND_WIDTH: number = 1 / 6;
export const VIEWBOX_SIZE: number = 100;
export const SVG_BASE_RADIUS: number = VIEWBOX_SIZE / DOUBLE;
export const CIRCLE_NORMAL_DEFAULT_WIDTH: number = 120;
export const CIRCLE_SMALL_DEFAULT_WIDTH: number = 84;
export const CIRCLE_NORMAL_DEFAULT_STROKE_WIDTH: number = 6;
export const CIRCLE_SMALL_DEFAULT_STROKE_WIDTH: number = 4;
export const LINE_NORMAL_DEFAULT_STROKE_WIDTH: number = 8;
export const LINE_SMALL_DEFAULT_STROKE_WIDTH: number = 6;
export const LINE_DEFAULT_WIDTH: number = 0;
export const CIRCLE_NORMAL_ICON_STROKE_WIDTH: number = 3;
export const CIRCLE_SMALL_ICON_STROKE_WIDTH: number = 2;
export const LINE_ICON_STROKE_WIDTH: number = 1;

export const MAX_DEFAULT: number = 100;
export const VALUE_DEFAULT: number = 0;
export const TYPE_DEFAULT: Type = "line";
export const SIZE_DEFAULT: Size = "normal";
export const STATUS_DEFAULT: Status = "normal";
export const SHOW_INFO_DEFAULT: boolean = true;
