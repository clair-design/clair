import { parse, isValid, add } from "date-fns";
import { getDefaultDisplayFormat } from "./formatter";
import { PickerType, RawDate, RangeValue, ParserOptions } from "../interface";

/**
 * parse raw value to Date object
 * @param value the value to parse
 * @param type value type
 * @param options parse options
 * @return the parsed Date object
 */
export const parseValue = (
  value: RawDate,
  type: PickerType,
  options: ParserOptions = {}
): Date | null => {
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(value);

  const defaultFormats: { [key: string]: string } = {
    date: /\d{2}\/\d{2}\/\d{4}/.test(value) ? "dd/MM/yyyy" : "yyyy-MM-dd",
    week: "YYYY'w'w",
    month: /\d{2}\/\d{4}/.test(value) ? "MM/yyyy" : "yyyy-MM",
    quarter: "yyyyQQQ",
    year: "yyyy"
  };

  const extraOptionsMap: { [key: string]: ParserOptions } = {
    week: {
      firstWeekContainsDate: 4,
      useAdditionalWeekYearTokens: true
    }
  };

  const format = options.format || defaultFormats[type];
  const extraOptions = Object.assign({}, extraOptionsMap[type], options);

  const parsed = parse(value, format, new Date(), extraOptions);
  let result = isValid(parsed) ? parsed : null;

  // use the fourth day as a week's value
  if (result && type === "week") {
    result = add(result, { days: 3 });
  }

  return result;
};

/**
 * Parse user input value, parse as display format or value format
 * @param format display format
 */
export const parseInputValue = (
  value: RawDate,
  type: PickerType,
  options: ParserOptions = {}
): Date | null => {
  const displayFormat = options.format || getDefaultDisplayFormat(type);
  return (
    parseValue(value, type, { ...options, format: displayFormat }) ||
    parseValue(value, type, options)
  );
};

/**
 * parse an array of raw date to Date object
 */
export const parseRangeValue = (
  value: RawDate[],
  type: PickerType,
  options: ParserOptions = {}
): RangeValue => {
  return value.map(item => parseValue(item, type, options));
};

/**
 * Parse user input range value, parse as display format or value format
 * @param format display format
 */
export const parseRangeInputValue = (
  value: RawDate[],
  type: PickerType,
  options: ParserOptions = {}
): RangeValue => {
  const displayFormat = options.format || getDefaultDisplayFormat(type);
  const valueAsDisplayFormat = parseRangeValue(value, type, {
    ...options,
    format: displayFormat
  });
  if (valueAsDisplayFormat.every(isValid)) {
    return valueAsDisplayFormat;
  }
  return parseRangeValue(value, type, options);
};
