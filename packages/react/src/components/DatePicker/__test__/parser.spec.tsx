/* eslint-disable no-magic-numbers */
import { parseValue, parseRangeValue } from "../lib/utils/parser";

describe("Date value parser", () => {
  test("parse dash separated date", () => {
    const date = parseValue("2020-03-15", "date");
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(2);
    expect(date?.getDate()).toBe(15);
  });

  test("parse slash separated date", () => {
    const date = parseValue("15/03/2020", "date");
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(2);
    expect(date?.getDate()).toBe(15);
  });

  test("pass Date object", () => {
    const date = parseValue(new Date(2020, 1, 1), "date");
    expect(date?.getFullYear()).toBe(2020);
  });

  test("pass timestamp", () => {
    const date = parseValue(1584448246547, "date");
    expect(date?.getFullYear()).toBe(2020);
  });

  test("invalid date", () => {
    const date = parseValue("2020年01月01日", "date");
    expect(date).toBe(null);
  });
});

describe("Week value parser", () => {
  test("normal week", () => {
    const date = parseValue("2020w01", "week");
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(0);
    expect(date?.getDate()).toBe(1);
  });

  test("normal week with weekStartsOn option", () => {
    const date = parseValue("2020w01", "week", {
      weekStartsOn: 1
    });
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(0);
    expect(date?.getDate()).toBe(2);
  });
});

describe("Month value parser", () => {
  test("normal month", () => {
    const date = parseValue("2020-12", "month");
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(11);
  });

  test("slash separated month", () => {
    const date = parseValue("12/2020", "month");
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(11);
  });

  test("month with custom format", () => {
    const date = parseValue("2020年12月", "month", { format: "yyyy年MM月" });
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(11);
  });
});

describe("Quarter value parser", () => {
  test("normal quarter", () => {
    const date = parseValue("2020Q1", "quarter");
    expect(date?.getFullYear()).toBe(2020);
    expect(date?.getMonth()).toBe(0);
  });
});

describe("Year value parser", () => {
  test("normal year", () => {
    const date = parseValue("2020", "year");
    expect(date?.getFullYear()).toBe(2020);
  });
});

describe("Range value parser", () => {
  test("normal range value", () => {
    const years = parseRangeValue(["2020", "2021"], "year");
    expect(years.length).toBe(2);
    expect(years[0]?.getFullYear()).toBe(2020);
    expect(years[1]?.getFullYear()).toBe(2021);
  });

  test("invalid range value", () => {
    const years = parseRangeValue(["a", "b"], "year");
    expect(years.length).toBe(2);
    expect(years[0]).toBe(null);
    expect(years[1]).toBe(null);
  });
});
