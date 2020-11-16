import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Slider } from "@components/Slider";
import { overrideError } from "@src/utils";

// mock timer
beforeAll(jest.useFakeTimers);
afterAll(jest.useRealTimers);

describe("Slider", () => {
  let toRecoverConsoleError: null | (() => void) = null;
  // override console.error
  beforeEach(() => {
    toRecoverConsoleError = overrideError();
  });

  afterEach(() => {
    // recover console.error
    if (typeof toRecoverConsoleError === "function") {
      toRecoverConsoleError();
    }
  });

  test("error should be thrown if min value greater than max", () => {
    expect(() => render(<Slider min={1000} />)).toThrow();
  });

  test("error should be thrown if range value not valid", () => {
    expect(() => render(<Slider value={[10]} />)).toThrow();
  });

  test("error should be thrown if value not between min and max", () => {
    expect(() => render(<Slider value={1000} />)).toThrow();
  });

  test("valid value ", () => {
    const { container, unmount } = render(<Slider value={[10, 5]} />);
    const buttons = container.querySelectorAll(".c-slider__thumb");
    expect(buttons[0].getAttribute("aria-valuenow")).toBe("5");
    expect(buttons[1].getAttribute("aria-valuenow")).toBe("10");
    expect(
      container.querySelector(".c-slider__progress-bar")?.getAttribute("style")
    ).toBe("width: 5%; left: 5%;");
    unmount();
    const slider = render(<Slider value={[]} />);
    const btns = slider.container.querySelectorAll(".c-slider__thumb");
    expect(btns[0].getAttribute("aria-valuenow")).toBe("0");
    expect(btns[1].getAttribute("aria-valuenow")).toBe("0");
    unmount();
    const slider1 = render(<Slider value={20} />);
    const btns1 = slider1.container.querySelectorAll(".c-slider__thumb");
    expect(btns1[0].getAttribute("aria-valuenow")).toBe("20");
  });

  test("mouseenter tooltip", () => {
    const { container } = render(
      <Slider value={10} tipFormat={(value: number) => `${value} %`} />
    );
    const button = container.querySelector(".c-slider__thumb") as Element;
    fireEvent.click(button);
    const tooltip = document.querySelector(".c-tooltip");
    // expect(tooltip?.getAttribute("aria-hidden")).toBe("true");
    expect(tooltip?.innerHTML).toBe("10 %");
    fireEvent.click(button);
    expect(
      document.querySelector(".c-tooltip")?.getAttribute("aria-hidden")
    ).toBe("false");
  });

  test("keyboard event", () => {
    const { container } = render(
      <Slider defaultValue={[3, 4]} onChange={() => console.log} />
    );
    const btns = container.querySelectorAll(".c-slider__thumb");
    const btn0 = btns[0] as Element;
    fireEvent.keyDown(btn0, { key: "ArrowLeft" });
    expect(btn0.getAttribute("aria-valuenow")).toBe("2");
    fireEvent.keyDown(btn0, { key: "ArrowDown" });
    expect(btn0.getAttribute("aria-valuenow")).toBe("1");
    const btn1 = btns[1] as Element;
    fireEvent.keyDown(btn1, { key: "ArrowRight" });
    expect(btn1.getAttribute("aria-valuenow")).toBe("5");
    fireEvent.keyDown(btn1, { key: "ArrowLeft" });
    fireEvent.keyDown(btn1, { key: "ArrowUp" });
    expect(btn1.getAttribute("aria-valuenow")).toBe("5");
    fireEvent.keyDown(btn1, { key: "ArrowDown" });
    fireEvent.keyDown(btn1, { key: "ArrowDown" });
    fireEvent.keyDown(btn1, { key: "ArrowDown" });
    fireEvent.keyDown(btn1, { key: "ArrowDown" });
    fireEvent.keyDown(btn1, { key: "ArrowDown" });
    fireEvent.keyDown(btn1, { key: "ArrowDown" });
    expect(btn1.getAttribute("aria-valuenow")).toBe("0");
  });

  test("showStepMark", () => {
    const { container } = render(<Slider showStepMark step={10} value={50} />);
    const marks = container.querySelectorAll(".c-slider__step-mark");
    expect(marks).toHaveLength(11);
    expect(
      container.querySelectorAll(".c-slider__step-mark--active")
    ).toHaveLength(6);
  });

  test("vertical mode", () => {
    const { container } = render(
      <Slider defaultValue={[10, 20]} mode="vertical" />
    );
    const btns = container.querySelectorAll(".c-slider__thumb");
    const btn0 = btns[0] as Element;

    expect(container.querySelectorAll(".c-slider--vertical")).toHaveLength(1);

    fireEvent.click(btn0);
    const tooltip = document.querySelector(".c-tooltip");
    expect(tooltip?.getAttribute("x-placement")).toBe("right-center");
  });

  test("mouse event", () => {
    const { container } = render(<Slider defaultValue={[10, 20]} />);
    const btns = container.querySelectorAll(".c-slider__thumb");
    const btn0 = btns[0] as Element;

    fireEvent.mouseDown(btn0);
    const tooltip = document.querySelector(".c-tooltip");
    expect(tooltip?.getAttribute("x-placement")).toBe("top-center");

    // fireEvent.mouseMove(btn0, { clientX: 5 });
    // fireEvent.mouseUp(btn0);
  });
});
