import React, { useState } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { InputNumber } from "@components/InputNumber";

const sleep = (time: number = 0) =>
  new Promise(resolve => setTimeout(resolve, time));

describe("InputNumber", () => {
  test("basic", () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByRole, getAllByRole } = render(
      <InputNumber
        defaultValue={2}
        min={1}
        max={3}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
    const input = getByRole("spinbutton");
    expect(input.getAttribute("aria-valuenow")).toBe("2");
    fireEvent.focus(input);
    expect(onFocus).toBeCalledTimes(1);
    fireEvent.blur(input);
    expect(onBlur).toBeCalledTimes(1);

    const [btn1, btn2] = getAllByRole("button");

    fireEvent.click(btn1);
    expect(input.getAttribute("aria-valuenow")).toBe("1");
    fireEvent.blur(input);
    fireEvent.click(btn2);
    expect(input.getAttribute("aria-valuenow")).toBe("2");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-valuenow")).toBe("1");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.getAttribute("aria-valuenow")).toBe("2");
  });
  test("long press", async () => {
    const { getByRole, getAllByRole } = render(
      <InputNumber defaultValue={2} />
    );
    const input = getByRole("spinbutton");
    const [btn1] = getAllByRole("button");
    await act(async () => {
      fireEvent.mouseDown(btn1);
      const sleepTime = 1000;
      await sleep(sleepTime);
      fireEvent.mouseUp(btn1);
    });
    expect(input.getAttribute("aria-valuenow")).not.toBe("2");
  });
  test("controlled", () => {
    const Demo = () => {
      const [state, setState] = useState(1);
      return (
        <InputNumber
          value={state}
          onChange={e => setState(e.target.value as number)}
        />
      );
    };
    const { getByRole, getAllByRole } = render(<Demo />);
    const input = getByRole("spinbutton");
    const [btn1] = getAllByRole("button");
    fireEvent.click(btn1);
    expect(input.getAttribute("aria-valuenow")).toBe("0");
  });
  test("input event", () => {
    const { getByRole } = render(<InputNumber />);

    const input = getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "23" } });
    expect(input.getAttribute("aria-valuenow")).toBe(null);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input.getAttribute("aria-valuenow")).toBe("23");

    fireEvent.change(input, { target: { value: "11a" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input.getAttribute("aria-valuenow")).toBe("23");
  });
  test("step", () => {
    const { getByRole } = render(<InputNumber step={3} />);
    const input = getByRole("spinbutton");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-valuenow")).toBe("-3");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.getAttribute("aria-valuenow")).toBe("3");

    fireEvent.change(input, { target: { value: "3.1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input.getAttribute("aria-valuenow")).toBe("3.1");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-valuenow")).toBe("0.1");
  });
  test("step fixed", () => {
    const { getByRole } = render(
      <InputNumber defaultValue={2} step={3} stepFixed />
    );
    const input = getByRole("spinbutton");
    expect(input.getAttribute("aria-valuenow")).toBe("2");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-valuenow")).toBe("-1");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.getAttribute("aria-valuenow")).toBe("5");

    fireEvent.change(input, { target: { value: "3.1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input.getAttribute("aria-valuenow")).toBe("2");
  });
  test("precision", () => {
    const { getByRole } = render(
      <InputNumber defaultValue={2} precision={3} />
    );
    const input = getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("2.000");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.value).toBe("1.000");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.value).toBe("3.000");
  });
  test("disabled", () => {
    const { getByRole } = render(<InputNumber defaultValue={2} disabled />);
    const input = getByRole("spinbutton");
    expect(input.getAttribute("aria-disabled")).toBe("true");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-valuenow")).toBe("2");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.getAttribute("aria-valuenow")).toBe("2");
  });
  test("controlPosition", () => {
    render(<InputNumber defaultValue={2} controlPosition="up-down" />);
    const wrapper = document.querySelector(".c-input-number") as Element;
    expect(wrapper.classList.contains("c-input-number--up-down")).toBe(true);
  });
});
