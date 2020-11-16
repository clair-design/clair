import { format } from "date-fns";
import { PickerType, RangeValue, FormatterOptions } from "../interface";

const getDefaultFormat = (type: PickerType): string => {
  const defaultFormats = {
    date: "yyyy-MM-dd",
    week: "YYYY'w'w",
    month: "yyyy-MM",
    quarter: "yyyy'q'Q",
    year: "yyyy"
  };
  return defaultFormats[type];
};

export const getDefaultDisplayFormat = (type: PickerType): string => {
  const defaultFormats = {
    date: "yyyy-MM-dd",
    week: "YYYY 第w周",
    month: "yyyy-MM",
    quarter: "yyyy 第Q季度",
    year: "yyyy"
  };
  return defaultFormats[type];
};

/**
 * format time for onChange callback
 */
export const formatValue = (
  value: Date | null,
  type: PickerType,
  options: FormatterOptions = {}
): string => {
  if (!value) return "";
  const usedFormat = options.format || getDefaultFormat(type);
  return format(value, usedFormat, {
    weekStartsOn: options.weekStartsOn,
    firstWeekContainsDate: 4,
    useAdditionalWeekYearTokens: true
  });
};

export const formatRangeValue = (
  value: RangeValue,
  type: PickerType,
  options: FormatterOptions = {}
) => {
  return value.map(item => formatValue(item, type, options));
};

/**
 * format time for display in the input field
 */
export const formatForDisplay = (
  value: Date | null,
  type: PickerType,
  options: FormatterOptions = {}
): string => {
  if (!value) return "";
  const usedFormat = options.format || getDefaultDisplayFormat(type);
  return format(value, usedFormat, {
    weekStartsOn: options.weekStartsOn,
    firstWeekContainsDate: 4,
    useAdditionalWeekYearTokens: true
  });
};

/**
 * format an array of Date for display in the input field
 */
export const formatRangeForDisplay = (
  value: RangeValue,
  type: PickerType,
  options: FormatterOptions = {}
): string[] => {
  if (value.length === 0) return ["", ""];
  return value.map(item => formatForDisplay(item, type, options));
};
