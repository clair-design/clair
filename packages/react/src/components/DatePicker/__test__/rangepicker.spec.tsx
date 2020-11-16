/* eslint-disable no-magic-numbers */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { RangePicker } from "..";
import { FocusableHandles } from "../lib/interface";

const querySelector = document.querySelector.bind(document);

describe("RangePicker", () => {
  test("uncontrolled range picker", async () => {
    const onChange = jest.fn();
    const { getAllByRole, getAllByText } = render(
      <RangePicker onChange={onChange} />
    );
    const [input] = getAllByRole("textbox");
    const popover = querySelector<HTMLElement>("[role='tooltip']");

    // open panel
    fireEvent.click(input);
    expect(popover).toBeTruthy();
    expect(popover?.style?.display).toBe("block");

    // click on date
    fireEvent.click(getAllByText("20")[0]);
    fireEvent.click(getAllByText("25")[1]);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value[0]).toMatch(/-20$/);
    expect(onChange.mock.calls[0][0].target.value[1]).toMatch(/-25$/);
    expect(popover?.style?.display).toBe("none");
  });

  test("range picker with default value", async () => {
    const defaultValue = ["2020-01-01", "2020-02-01"];
    const { getAllByRole } = render(
      <RangePicker defaultValue={defaultValue} />
    );
    const [start, end] = getAllByRole("textbox") as HTMLInputElement[];
    expect(start.value).toBe(defaultValue[0]);
    expect(end.value).toBe(defaultValue[1]);
  });

  test("controlled range picker", async () => {
    const [start, end] = ["2020-01-01", "2020-02-01"];
    const { getAllByRole, rerender } = render(
      <RangePicker value={[start, end]} />
    );
    const inputs = getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs[0].value).toBe(start);
    expect(inputs[1].value).toBe(end);

    // change value prop
    const [newStart, newEnd] = ["2020-02-01", "2020-03-01"];
    rerender(<RangePicker value={[newStart, newEnd]} />);
    expect(inputs[0].value).toBe(newStart);
    expect(inputs[1].value).toBe(newEnd);
  });

  test("user input by typing", async () => {
    const onChange = jest.fn();
    const [start, end] = ["2020-01-01", "2020-02-01"];
    const { getAllByRole } = render(<RangePicker onChange={onChange} />);
    const inputs = getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.focus(inputs[0]);
    fireEvent.change(inputs[0], { target: { value: start } });
    fireEvent.focus(inputs[1]);
    fireEvent.change(inputs[1], { target: { value: end } });
    fireEvent.blur(inputs[1]);

    expect(onChange.mock.calls.length).toBe(1);
    const receivedValue = onChange.mock.calls[0][0].target.value;
    expect(receivedValue[0]).toBe(start);
    expect(receivedValue[1]).toBe(end);
  });

  test("switch mode", async () => {
    const onChange = jest.fn();
    const { getAllByRole, getAllByText, queryByText } = render(
      <RangePicker value={["2020-01-01", "2020-02-01"]} onChange={onChange} />
    );
    const inputs = getAllByRole("textbox") as HTMLInputElement[];

    fireEvent.click(inputs[0]);
    fireEvent.click(getAllByText("2020年")[0]);
    expect(queryByText("2020年 - 2029年")).toBeTruthy();
    fireEvent.click(getAllByText("2021")[0]);
    fireEvent.click(getAllByText("五月")[0]);
    fireEvent.click(getAllByText("5月")[0]);
    fireEvent.click(getAllByText("八月")[0]);
    fireEvent.click(getAllByText("20")[0]);
    fireEvent.click(getAllByText("20")[1]);

    expect(onChange.mock.calls.length).toBe(1);
    const receivedValue = onChange.mock.calls[0][0].target.value;
    expect(receivedValue[0]).toBe("2021-08-20");
    expect(receivedValue[1]).toBe("2021-09-20");
  });

  test("switch calendar by clicking next/prev button", async () => {
    const [start, end] = ["2020-01-01", "2020-02-01"];
    const {
      getAllByRole,
      getByLabelText,
      queryAllByText,
      queryByText
    } = render(<RangePicker value={[start, end]} />);
    const inputs = getAllByRole("textbox") as HTMLInputElement[];

    // open the panel and click next year
    fireEvent.click(inputs[0]);
    fireEvent.click(getByLabelText("Next Year"));
    expect(queryAllByText("2021年").length).toBe(2);

    fireEvent.click(getByLabelText("Previous Year"));
    expect(queryAllByText("2020年").length).toBe(2);

    fireEvent.click(getByLabelText("Next Month"));
    expect(queryByText("2月")).toBeTruthy();
    expect(queryByText("3月")).toBeTruthy();

    fireEvent.click(getByLabelText("Previous Month"));
    expect(queryByText("1月")).toBeTruthy();
    expect(queryByText("2月")).toBeTruthy();
  });

  test("select value by keyboard", () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(
      <RangePicker value={["2020-01-01", "2020-02-01"]} onChange={onChange} />
    );
    const inputs = getAllByRole("textbox") as HTMLInputElement[];

    fireEvent.focus(inputs[0]);
    fireEvent.keyDown(inputs[0], { key: "Enter" });
    fireEvent.keyDown(inputs[0], { key: "ArrowDown" }); // focus on date 01-01

    const grid = querySelector<HTMLElement>("[role='grid']") as HTMLElement;
    fireEvent.keyDown(grid, { key: "ArrowRight" }); // date 01-02
    fireEvent.keyDown(grid, { key: "Enter" }); // select date 01-02
    fireEvent.keyDown(grid, { key: "ArrowDown" }); // next week (01-09)
    fireEvent.keyDown(grid, { key: "Enter" }); // select date 01-09

    expect(onChange.mock.calls.length).toBe(1);
    const receivedValue = onChange.mock.calls[0][0].target.value;
    expect(receivedValue[0]).toBe("2020-01-02");
    expect(receivedValue[1]).toBe("2020-01-09");
  });

  test("hover on end date to show range", () => {
    const { getAllByRole, getAllByText } = render(
      <RangePicker value={["2020-01-01", "2020-02-01"]} />
    );
    const inputs = getAllByRole("textbox") as HTMLInputElement[];
    const highlightClass = "c-date-picker__day--highlight";

    fireEvent.click(inputs[0]);
    fireEvent.click(getAllByText("20")[0]); // select start date
    fireEvent.mouseEnter(getAllByText("22")[0]); // hover on end date
    expect(getAllByText("21")[0].classList.contains(highlightClass));
  });

  test("clear button", () => {
    const onChange = jest.fn();
    const { getAllByRole, getByLabelText, queryByLabelText } = render(
      <RangePicker value={["2020-01-01", "2020-02-01"]} onChange={onChange} />
    );
    const inputs = getAllByRole("textbox") as HTMLInputElement[];

    // hover on the input
    fireEvent.mouseEnter(inputs[0]);
    const clearButton = getByLabelText("Clear");
    fireEvent.click(clearButton);
    expect(inputs[0].value).toBe("");
    expect(inputs[1].value).toBe("");

    // leave the input
    fireEvent.mouseLeave(inputs[0]);
    expect(queryByLabelText("Clear")).toBe(null);
  });

  test("focus and blur", async () => {
    const pickerRef = React.createRef<FocusableHandles>();
    const { getAllByRole } = render(<RangePicker ref={pickerRef} />);
    const [input] = getAllByRole("textbox");

    pickerRef.current?.focus();
    expect(document.activeElement).toBe(input);

    pickerRef.current?.blur();
    expect(document.activeElement).not.toBe(input);
  });
});
