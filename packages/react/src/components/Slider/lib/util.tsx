import { round, divide } from "lodash-es";
import { isNil } from "@clair/helpers";
import { createError } from "@src/utils";

const TWO = 2;

export type SliderTypes = "start" | "end";

// 根据from & step, 重新计算符合规范的value值
export const roundValue = (from: number, multiple: number, num: number) => {
  // 例如: from=1, step=4, num=12, 则需要将num处理为13(1/5/9/13)
  // 若: from=1, step=4, num=10, 则需要将num处理为9
  return round(divide(num - from, multiple)) * multiple + from;
};

// 初始参数校验
interface ValidatorProps {
  min: number;
  max: number;
  defaultValue?: number | number[];
  value?: number | number[];
  step: number;
}

const errorType = "[Slider Error]";

export const normalizeStartAndEnd = ({
  min,
  max,
  defaultValue,
  value,
  step
}: ValidatorProps) => {
  if (min > max) {
    throw createError(errorType, "min should not be greater than max");
  }

  const actualValue = !isNil(value) ? value : defaultValue;

  if (
    Array.isArray(actualValue) &&
    actualValue.length &&
    actualValue.length !== TWO
  ) {
    throw createError(
      errorType,
      "Range should have two default value or be empty"
    );
  }

  let startValue = null;
  let endValue = null;
  if (Array.isArray(actualValue) && actualValue.length) {
    [startValue, endValue] = actualValue;
  } else if (Array.isArray(actualValue)) {
    endValue = min;
    startValue = min;
  } else {
    startValue = min;
    endValue = actualValue || min;
  }

  if (startValue < min || endValue > max) {
    throw createError(errorType, "value should between min and max");
  }
  if (startValue > endValue) {
    [startValue, endValue] = [endValue, startValue];
  }

  // 根据min & step, 格式化给定value
  return {
    start: roundValue(min, step, startValue),
    end: roundValue(min, step, endValue)
  };
};

// 根据模式获取维度
const toolTipDimension = ["top", "right"] as const;
const clientPosDimension = ["clientX", "clientY"] as const;
const thumbPosDimension = ["left", "bottom"] as const;
const sizeDimension = ["width", "height"] as const;
const containerSizeDimension = ["clientWidth", "clientHeight"] as const;
interface SizeInfo {
  toolTipDimension: typeof toolTipDimension[number];
  clientPosDimension: typeof clientPosDimension[number];
  thumbPosDimension: typeof thumbPosDimension[number];
  sizeDimension: typeof sizeDimension[number];
  containerSizeDimension: typeof containerSizeDimension[number];
}
export const getSizeInfo = (mode: string): SizeInfo => {
  const isHorizontal = mode === "horizontal";
  return {
    toolTipDimension: isHorizontal ? "top" : "right",
    clientPosDimension: isHorizontal ? "clientX" : "clientY",
    thumbPosDimension: isHorizontal ? "left" : "bottom",
    sizeDimension: isHorizontal ? "width" : "height",
    containerSizeDimension: isHorizontal ? "clientWidth" : "clientHeight"
  };
};

export const formatTooltip = (formatFn: Function) => (value: number) =>
  formatFn(value);
