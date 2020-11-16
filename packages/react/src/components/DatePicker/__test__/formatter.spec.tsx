/* eslint-disable no-magic-numbers */
import {
  formatValue,
  formatForDisplay,
  formatRangeValue,
  formatRangeForDisplay
} from "../lib/utils/formatter";

describe("Format value", () => {
  const date = new Date(2020, 0, 1);
  test("format date using default format", () => {
    const result = formatValue(date, "date");
    expect(result).toBe("2020-01-01");
  });

  test("format month using default format", () => {
    const result = formatValue(date, "month");
    expect(result).toBe("2020-01");
  });

  test("format week using default format", () => {
    const result = formatValue(date, "week");
    expect(result).toBe("2020w1");
  });

  test("format quarter using default format", () => {
    const result = formatValue(date, "quarter");
    expect(result).toBe("2020q1");
  });

  test("format year using default format", () => {
    const result = formatValue(date, "year");
    expect(result).toBe("2020");
  });

  test("format empty value", () => {
    const result = formatValue(null, "date");
    expect(result).toBe("");
  });
});

describe("Format display value", () => {
  const date = new Date(2020, 0, 1);
  test("format date using default format", () => {
    const result = formatForDisplay(date, "date");
    expect(result).toBe("2020-01-01");
  });

  test("format month using default format", () => {
    const result = formatForDisplay(date, "month");
    expect(result).toBe("2020-01");
  });

  test("format month using custom format", () => {
    const result = formatForDisplay(date, "month", { format: "yyyy年M月" });
    expect(result).toBe("2020年1月");
  });

  test("format week using default format", () => {
    const result = formatForDisplay(date, "week");
    expect(result).toBe("2020 第1周");
  });

  test("format quarter using default format", () => {
    const result = formatForDisplay(date, "quarter");
    expect(result).toBe("2020 第1季度");
  });

  test("format year using default format", () => {
    const result = formatForDisplay(date, "year");
    expect(result).toBe("2020");
  });

  test("format empty value", () => {
    const result = formatForDisplay(null, "date");
    expect(result).toBe("");
  });
});

describe("Format range value", () => {
  const start = new Date(2020, 0, 1);
  const end = new Date(2020, 1, 1);
  test("format date using default format", () => {
    const result = formatRangeValue([start, end], "date");
    expect(result[0]).toBe("2020-01-01");
    expect(result[1]).toBe("2020-02-01");
  });
});

describe("Format range value for display", () => {
  const start = new Date(2020, 0, 1);
  const end = new Date(2020, 1, 1);
  test("format date using default format", () => {
    const result = formatRangeForDisplay([start, end], "date");
    expect(result[0]).toBe("2020-01-01");
    expect(result[1]).toBe("2020-02-01");
  });

  test("format empty value", () => {
    const result = formatRangeForDisplay([], "date");
    expect(result[0]).toBe("");
    expect(result[1]).toBe("");
  });
});
