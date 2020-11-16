import { isNil } from "lodash-es";
import { ValueParseOption } from "./types";

function getPrecision(num: number) {
  const str = num.toString();
  const [, suffix] = str.split(".");
  return suffix?.length ?? 0;
}

function getMaxPrecision(num1: number, num2: number) {
  return Math.max(getPrecision(num1), getPrecision(num2));
}

/**
 * add args accurately by self precision
 */
export function accurateAdd(num1: number, num2: number) {
  return Number((num1 + num2).toFixed(getMaxPrecision(num1, num2)));
}

/**
 * parse value by options
 */
export const formatValue = (
  value: number | undefined,
  { min, max, precision, step, stepFixed, initialValue }: ValueParseOption
) => {
  if (isNil(value)) return "";

  let validValue = Math.min(Math.max(min, value), max);
  let usedPrecision = precision ?? getMaxPrecision(value, step);

  // 设置了stepFixed & 非默认值, 需要针对offset进行校验
  if (stepFixed && !isNil(initialValue)) {
    validValue =
      initialValue + Math.round((value - initialValue) / step) * step;
    usedPrecision = getPrecision(step);
  }

  return validValue.toFixed(Math.abs(usedPrecision));
};

/**
 * parse string value to number
 */
export const parseStrToNumber = (value: string) => {
  return value ? Number(value) : undefined;
};
