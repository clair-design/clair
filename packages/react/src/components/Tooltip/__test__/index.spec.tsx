import React, { useState, useEffect } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Tooltip } from "@components/Tooltip";
import { FindDOMWrapper } from "@components/Tooltip/lib/FindDOMWrapper";
import { overrideError, SharedDOMContext } from "@src/utils";
import { useXPlacementAttr } from "@components/Tooltip/lib/hooks/popover";

const mouseEnterEvent = new MouseEvent("mouseenter");
const mouseLeaveEvent = new MouseEvent("mouseleave");
const focusEvent = new Event("focus");
const blurEvent = new Event("blur");

// mock timer
beforeAll(jest.useFakeTimers);
afterAll(jest.useRealTimers);

const DELAY = 100;
describe("Tooltip", () => {
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

  test("useXPlacementAttr run correctly", () => {
    expect(useXPlacementAttr("top")).toBe("top-center");
    expect(useXPlacementAttr("top-right")).toBe("top-right");
  });

  test("FindDOMWrapper works as design", () => {
    expect.assertions(1);
    const text: string = "find me";
    const Component = () => {
      const [target, updateTarget] = useState<HTMLElement | null>(null);
      useEffect(() => {
        if (target) {
          expect(target.textContent === text).toBe(true);
        }
      }, [target]);
      return (
        <div>
          <SharedDOMContext.Provider
            value={{
              dom: target,
              updateDom: updateTarget
            }}
          >
            <FindDOMWrapper>
              <button>{text}</button>
            </FindDOMWrapper>
          </SharedDOMContext.Provider>
        </div>
      );
    };
    render(<Component />);
  });

  test("error should be thrown if no children is provided", () => {
    expect(() =>
      render(
        // @ts-ignore
        <Tooltip content="test" />
      )
    ).toThrow();
  });

  test("onVisibilityChange should be called correctly", () => {
    const onVisibilityChange = jest.fn();
    const { getByText } = render(
      <Tooltip content="test" onVisibilityChange={onVisibilityChange}>
        <button>visibleChange</button>
      </Tooltip>
    );
    const button = getByText("visibleChange");
    const calledWith = onVisibilityChange.mock.calls;
    fireEvent(button, mouseEnterEvent);
    expect(onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(calledWith.slice(-1)[0][0]).toMatchObject({
      detail: { visible: true }
    });
    fireEvent(button, mouseLeaveEvent);
    jest.advanceTimersByTime(DELAY);
    expect(onVisibilityChange).toHaveBeenCalledTimes(2);
    expect(calledWith.slice(-1)[0][0]).toMatchObject({
      detail: { visible: false }
    });
  });

  // TODO: test state change for function components

  test("`visible` from props has higher priority than state", () => {
    const { getByText, getByRole } = render(
      <Tooltip content="test" visible>
        <button>props</button>
      </Tooltip>
    );
    const tooltip = getByRole("tooltip");
    expect(tooltip).toBeTruthy();
    jest.advanceTimersByTime(DELAY);
    expect(tooltip.style.display === "block").toBe(true);
    const button = getByText("props");
    fireEvent(button, mouseLeaveEvent);
    jest.advanceTimersByTime(DELAY);
    expect(tooltip.style.display === "block").toBe(true);
  });

  test("handle `showDelay` and `hideDelay` correctly", () => {
    const SHOW_DELAY = 100;
    const HIDE_DELAY = 200;
    const { getByRole, getByText } = render(
      <Tooltip
        content="showDelay"
        showDelay={SHOW_DELAY}
        hideDelay={HIDE_DELAY}
      >
        <button>button</button>
      </Tooltip>
    );
    const tooltip = getByRole("tooltip", {
      hidden: true
    });
    const button = getByText("button");
    fireEvent(button, focusEvent);
    expect(tooltip.style.display).toBe("none");
    jest.advanceTimersByTime(SHOW_DELAY + SHOW_DELAY);
    expect(tooltip.style.display).toBe("block");
    fireEvent(button, blurEvent);
    expect(tooltip.style.display).toBe("block");
    jest.advanceTimersByTime(HIDE_DELAY);
    expect(tooltip.style.display).toBe("none");
  });

  test("debounce visibility correctly", () => {
    const onVisibilityChange = jest.fn();
    const { getByRole, getByText } = render(
      <Tooltip
        content="debounce"
        onVisibilityChange={onVisibilityChange}
        showDelay={DELAY}
      >
        <button>debounce button</button>
      </Tooltip>
    );
    const button = getByText("debounce button");
    fireEvent(button, focusEvent);
    fireEvent(button, blurEvent);
    const tooltip = getByRole("tooltip", { hidden: true });
    jest.advanceTimersByTime(DELAY);
    expect(tooltip.style.display).toBe("none");
  });

  test("hide immediately when hideDelay=0", () => {
    const { getByRole, getByText } = render(
      <Tooltip content="hide" hideDelay={0}>
        <button>button</button>
      </Tooltip>
    );
    const button = getByText("button");
    const tooltip = getByRole("tooltip", { hidden: true });
    button.dispatchEvent(focusEvent);
    jest.advanceTimersByTime(DELAY);
    expect(tooltip.style.display).toBe("block");
    button.dispatchEvent(blurEvent);
    // should hide immediately
    expect(tooltip.style.display).toBe("none");
  });

  test("handle click trigger correctly", () => {
    const { getByText, getByRole } = render(
      <Tooltip content="test" trigger="click">
        <button>click</button>
      </Tooltip>
    );
    const button = getByText("click");
    const tooltip = getByRole("tooltip", { hidden: true });
    fireEvent.click(button);
    expect(tooltip.style.display).toBe("block");
    fireEvent.click(button);
    jest.advanceTimersByTime(DELAY);
    expect(tooltip.style.display).toBe("none");
  });

  test("handle focus trigger correctly", () => {
    const { getByText, getByRole } = render(
      <Tooltip content="test" trigger="focus">
        <button>focus</button>
      </Tooltip>
    );
    const button = getByText("focus");
    const tooltip = getByRole("tooltip", { hidden: true });
    fireEvent.focus(button);
    expect(tooltip.style.display).toBe("block");
    fireEvent.blur(button);
    jest.advanceTimersByTime(DELAY);
    expect(tooltip.style.display).toBe("none");
  });

  test("handle hover trigger correctly", () => {
    const { getByText, getByRole } = render(
      <Tooltip content="test" trigger="hover">
        <button>hover</button>
      </Tooltip>
    );
    const button = getByText("hover");
    const tooltip = getByRole("tooltip", { hidden: true });
    fireEvent(button, mouseEnterEvent);
    expect(tooltip.style.display).toBe("block");
    fireEvent(button, mouseLeaveEvent);
    jest.advanceTimersByTime(DELAY);
    expect(tooltip.style.display).toBe("none");
  });

  test("original event remains the same", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Tooltip content="test" trigger="click">
        <button onClick={onClick}>click</button>
      </Tooltip>
    );

    fireEvent.click(getByText("click"));
    expect(onClick).toBeCalled();
  });

  test("accept style and className and apply them properly", () => {
    const style: React.CSSProperties = {
      fontSize: "100px"
    };
    const className: string = "testClass";
    const { getByRole } = render(
      <Tooltip content="style" style={style} className={className}>
        <button>button</button>
      </Tooltip>
    );
    const tooltip = getByRole("tooltip", { hidden: true });
    expect(tooltip.style.fontSize).toBe("100px");
    expect(tooltip.classList.contains(className)).toBe(true);
  });

  test("update placement-related attribute properly", () => {
    const { getByRole } = render(
      <Tooltip content="placement" placement="top-left">
        <button>button</button>
      </Tooltip>
    );
    const tooltip = getByRole("tooltip", { hidden: true });
    expect(tooltip.getAttribute("x-placement")).toBe("top-left");
  });

  test("`appendTarget` works as design", () => {
    const div = document.createElement("div");
    const { getByRole } = render(
      <Tooltip content="test" appendTarget={div}>
        <button>button</button>
      </Tooltip>
    );
    expect(() => getByRole("tooltip", { hidden: true })).toThrow();
    expect(div.querySelector("[role=tooltip]")).toBeTruthy();
  });
});
