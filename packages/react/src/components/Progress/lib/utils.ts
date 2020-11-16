import {
  PERCENTAGE_VALUE,
  Type,
  Size,
  CIRCLE_SMALL_DEFAULT_WIDTH,
  CIRCLE_NORMAL_DEFAULT_WIDTH,
  LINE_DEFAULT_WIDTH,
  CIRCLE_SMALL_DEFAULT_STROKE_WIDTH,
  CIRCLE_NORMAL_DEFAULT_STROKE_WIDTH,
  LINE_SMALL_DEFAULT_STROKE_WIDTH,
  LINE_NORMAL_DEFAULT_STROKE_WIDTH
} from "./constant";

const PRECISION: number = 3;
export const toFixed = (v: number) => parseFloat(v.toFixed(PRECISION));

export function getPercentage(value: number, max: number): number {
  return toFixed((value / max) * PERCENTAGE_VALUE);
}

export function getValidWidth(type: Type, size: Size, width?: number): number {
  if (typeof width !== "number") {
    if (type === "circle") {
      return size === "small"
        ? CIRCLE_SMALL_DEFAULT_WIDTH
        : CIRCLE_NORMAL_DEFAULT_WIDTH;
    }
    return LINE_DEFAULT_WIDTH;
  }
  return width;
}

export function getValidStrokeWidth(
  type: Type,
  size: Size,
  strokeWidth?: number
): number {
  if (typeof strokeWidth !== "number") {
    if (type === "circle") {
      return size === "small"
        ? CIRCLE_SMALL_DEFAULT_STROKE_WIDTH
        : CIRCLE_NORMAL_DEFAULT_STROKE_WIDTH;
    }
    return size === "small"
      ? LINE_SMALL_DEFAULT_STROKE_WIDTH
      : LINE_NORMAL_DEFAULT_STROKE_WIDTH;
  }
  return strokeWidth;
}
