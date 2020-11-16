import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { DatePicker } from "..";
import { FocusableHandles } from "../lib/interface";

const querySelector = document.querySelector.bind(document);

describe("DatePicker", () => {
  test("uncontrolled date picker", async () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(<DatePicker onChange={onChange} />);
    const input = getByRole("textbox");
    const popover = querySelector<HTMLElement>("[role='tooltip']");

    // open panel
    fireEvent.click(input);
    expect(popover).toBeTruthy();
    expect(popover?.style?.display).toBe("block");

    // click on date
    const date20 = getByText("20");
    fireEvent.click(date20);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toMatch(/20$/);
    expect(popover?.style?.display).toBe("none");
  });

  test("date picker with default value", async () => {
    const defaultValue = "2020-01-01";
    const { getByRole } = render(<DatePicker defaultValue={defaultValue} />);
    const input = getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe(defaultValue);
  });

  test("controlled date picker", () => {
    const value = "2020-01-01";
    const value2 = "2020-02-01";
    const onChange = jest.fn();
    const { getByRole, queryByText, rerender } = render(
      <DatePicker value={value} onChange={onChange} />
    );

    const input = getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe(value);
    rerender(<DatePicker value={value2} />);
    expect(input.value).toBe(value2);

    fireEvent.click(input);
    const yearButton = queryByText("2020年");
    const monthButton = queryByText("2月");
    expect(yearButton).toBeTruthy();
    expect(monthButton).toBeTruthy();
  });

  test("mode switch", async () => {
    const onChange = jest.fn();
    const { getByRole, queryByText, getByText } = render(
      <DatePicker value="2020-01-01" onChange={onChange} />
    );

    // open panel and click year
    const input = getByRole("textbox");
    fireEvent.click(input);
    const yearButton = getByText("2020年");
    fireEvent.click(yearButton);
    expect(queryByText("2020年 - 2029年")).toBeTruthy();

    // select year 2021
    const year2021 = getByText("2021");
    fireEvent.click(year2021);
    expect(queryByText("2021年")).toBeTruthy();

    // click month
    fireEvent.click(getByText("五月"));
    expect(queryByText("2021年")).toBeTruthy();
    expect(queryByText("5月")).toBeTruthy();

    // switch to month mode
    fireEvent.click(getByText("5月"));
    fireEvent.click(getByText("八月"));

    // click date 20
    fireEvent.click(getByText("20"));
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("2021-08-20");
  });

  test("user input date by typing in the text field", async () => {
    const onChange = jest.fn();
    const { getByRole } = render(<DatePicker onChange={onChange} />);
    const input = getByRole("textbox");
    const popover = querySelector<HTMLElement>("[role='tooltip']");

    // type text in the text box and blur
    fireEvent.click(input);
    expect(popover?.style?.display).toBe("block");
    fireEvent.change(input, { target: { value: "2020-01-01" } });
    fireEvent.blur(input);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("2020-01-01");
    expect(popover?.style?.display).toBe("none");
  });

  test("select date using keyboard", async () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <DatePicker value="2020-01-01" onChange={onChange} />
    );
    const input = getByRole("textbox");

    // focus in the text box and then press ARROW_DOWN key
    fireEvent.click(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });

    // press DOWN again and press ENTER
    const grid = querySelector("[role='grid']") as HTMLElement;
    fireEvent.keyDown(grid, { key: "ArrowUp" }); // focus prev week (12-25)
    fireEvent.keyDown(grid, { key: "ArrowLeft" }); // focus prev day (12-24)
    fireEvent.keyDown(grid, { key: "Enter" });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("2019-12-24");
  });

  test("close panel using escape key", async () => {
    const { getByRole } = render(<DatePicker />);
    const input = getByRole("textbox");
    const popover = querySelector("[role='tooltip']") as HTMLElement;

    fireEvent.click(input);
    expect(popover?.style?.display).toBe("block");

    fireEvent.keyDown(input, { key: "Escape" });
    expect(popover?.style?.display).toBe("none");

    fireEvent.click(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(popover?.style?.display).toBe("block");

    const grid = querySelector("[role='grid']") as HTMLElement;
    fireEvent.keyDown(grid, { key: "Escape" });
    expect(popover?.style?.display).toBe("none");
  });

  test("default focused cell", async () => {
    const { getByRole, getAllByText, rerender } = render(
      <DatePicker value="2020-01-01" />
    );
    const input = getByRole("textbox");
    const isFocused = (node: HTMLElement) =>
      node.classList.contains("c-date-picker__day--active");
    const isNotDimmed = (node: HTMLElement) =>
      !node.classList.contains("c-date-picker__day--dimmed");

    // focus in the text box and then press ARROW_DOWN key
    fireEvent.click(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });

    // date 01 should be focused
    const [date01] = getAllByText("1").filter(isNotDimmed);
    expect(isFocused(date01));

    rerender(<DatePicker />);
    // focus in the text box and then press ARROW_DOWN key
    fireEvent.click(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });

    // today should be focused
    const today = new Date().getDate();
    const [todayNode] = getAllByText(String(today)).filter(isNotDimmed);
    expect(isFocused(todayNode));
  });

  test("clear button", async () => {
    const { getByRole, getByLabelText, queryByLabelText } = render(
      <DatePicker value="2020-01-01" />
    );
    const input = getByRole("textbox") as HTMLInputElement;

    // hover on the input
    fireEvent.mouseEnter(input);
    const clearButton = getByLabelText("Clear");
    fireEvent.click(clearButton);
    expect(input.value).toBe("");

    // leave the input
    fireEvent.mouseLeave(input);
    expect(queryByLabelText("Clear")).toBe(null);
  });

  test("switch calendar by clicking next/prev button", async () => {
    const { getByRole, getByLabelText, queryByText } = render(
      <DatePicker value="2020-01-01" />
    );
    const input = getByRole("textbox") as HTMLInputElement;

    // open the panel and click next year
    fireEvent.click(input);
    fireEvent.click(getByLabelText("Next Year"));
    expect(queryByText("2021年")).toBeTruthy();

    fireEvent.click(getByLabelText("Previous Year"));
    expect(queryByText("2020年")).toBeTruthy();

    fireEvent.click(getByLabelText("Next Month"));
    expect(queryByText("2月")).toBeTruthy();

    fireEvent.click(getByLabelText("Previous Month"));
    expect(queryByText("1月")).toBeTruthy();
  });

  test("focus and blur", async () => {
    const pickerRef = React.createRef<FocusableHandles>();
    const { getByRole } = render(<DatePicker ref={pickerRef} />);
    const input = getByRole("textbox");

    pickerRef.current?.focus();
    expect(document.activeElement).toBe(input);

    pickerRef.current?.blur();
    expect(document.activeElement).not.toBe(input);
  });
});

describe("WeekPicker", () => {
  test("uncontrolled week picker", async () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(
      <DatePicker type="week" onChange={onChange} />
    );
    const input = getByRole("textbox");

    // click on date
    fireEvent.click(input);
    fireEvent.click(getByText("20"));

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toMatch(/\d{4}w\d+$/);
  });

  test("controlled week picker", async () => {
    const { getByRole, rerender } = render(
      <DatePicker type="week" value="2020w1" />
    );
    const input = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("2020 第1周");
    rerender(<DatePicker type="week" value="2020w2" />);
    expect(input.value).toBe("2020 第2周");
  });
});

describe("MonthPicker", () => {
  test("uncontrolled month picker", async () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(
      <DatePicker type="month" onChange={onChange} />
    );
    const input = getByRole("textbox");

    // click on date
    fireEvent.click(input);
    fireEvent.click(getByText("五月"));

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toMatch(/-05$/);
  });

  test("controlled month picker", async () => {
    const { getByRole, rerender } = render(
      <DatePicker type="month" value="2020-01" format="yyyy年M月" />
    );
    const input = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("2020年1月");
    rerender(<DatePicker type="month" value="2020-02" format="yyyy年M月" />);
    expect(input.value).toBe("2020年2月");
  });
});

describe("QuarterPicker", () => {
  test("uncontrolled month picker", async () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(
      <DatePicker type="quarter" onChange={onChange} />
    );
    const input = getByRole("textbox");

    // click on date
    fireEvent.click(input);
    fireEvent.click(getByText("五月"));

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toMatch(/q2$/);
  });

  test("controlled quarter picker", async () => {
    const { getByRole, rerender } = render(
      <DatePicker type="quarter" value="2020q1" />
    );
    const input = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("2020 第1季度");
    rerender(<DatePicker type="quarter" value="2020q2" />);
    expect(input.value).toBe("2020 第2季度");
  });
});
