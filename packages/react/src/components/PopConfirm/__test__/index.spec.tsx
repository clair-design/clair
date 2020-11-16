import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PopConfirm, Button } from "@src/index";
import { overrideError } from "@src/utils";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
  jest.useFakeTimers();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
  jest.useRealTimers();
});

describe("PopConfirm", () => {
  test("override footer correctly", () => {
    render(
      <PopConfirm content="footer" footer={null}>
        <button>button</button>
      </PopConfirm>
    );

    expect(document.querySelector(".c-popconfirm__footer")).toBeFalsy();
  });

  test("onConfirm and onCancel to be called", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const { getByText, getByRole } = render(
      <PopConfirm content="test" onConfirm={onConfirm} onCancel={onCancel}>
        <Button className="click">click</Button>
      </PopConfirm>
    );
    const button = getByText("click");
    fireEvent.click(button);
    const popConfirm = getByRole("dialog", { hidden: true });
    const confirmButton = popConfirm.querySelector("button.c-button--primary");
    const cancelButton = popConfirm.querySelector(
      "button.c-button--default:not(.click)"
    );
    fireEvent.click(confirmButton as HTMLElement);
    expect(onConfirm).toBeCalled();
    fireEvent.click(button);
    fireEvent.click(cancelButton as HTMLElement);
    expect(onCancel).toBeCalled();
  });

  test("original onClick remains the same", async () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <PopConfirm content="test">
        <Button className="click" onClick={onClick}>
          click
        </Button>
      </PopConfirm>
    );
    const button = getByText("click");
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });

  test("respond to click event properly", async () => {
    let promise: null | Promise<boolean> = null;
    const { getByText, getByRole } = render(
      <PopConfirm
        content="test"
        onConfirm={() => {
          promise = Promise.resolve(true);
          return promise;
        }}
      >
        <Button className="click">click</Button>
      </PopConfirm>
    );
    const popConfirm = getByRole("dialog", { hidden: true });
    expect(popConfirm.style.display).toBe("none");
    const button = getByText("click");
    fireEvent.click(button);
    jest.advanceTimersByTime(0);
    expect(popConfirm.style.display).toBe("block");
    const confirmButton = popConfirm.querySelector(
      "button.c-button--primary"
    ) as HTMLElement;
    fireEvent.click(confirmButton);
    await promise;
    expect(popConfirm.style.display).toBe("none");
  });

  test("confirm button will automatically gain the focus", () => {
    const { getByText } = render(
      <PopConfirm content="test">
        <Button className="click">click</Button>
      </PopConfirm>
    );
    const button = getByText("click");
    fireEvent.click(button);
    return Promise.resolve().then(() => {
      expect(
        document.activeElement ===
          document.querySelector("button.c-button--primary")
      ).toBe(true);
    });
  });

  test("support async onConfirm/onCancel", async () => {
    const delay: number = 100;
    let promise: null | Promise<boolean> = null;
    const onConfirm = () => {
      promise = new Promise(resolve => setTimeout(resolve, delay));
      return promise;
    };
    const { getByRole, getByText } = render(
      <PopConfirm content="async content" onConfirm={onConfirm}>
        <Button className="async">async</Button>
      </PopConfirm>
    );
    const button = getByText("async");
    fireEvent.click(button);
    const popConfirm = getByRole("dialog");
    const confirmButton = popConfirm.querySelector(
      "button.c-button--primary"
    ) as HTMLElement;
    fireEvent.click(confirmButton);
    expect(popConfirm.style.display).toBe("block");
    jest.advanceTimersByTime(delay);
    await promise;
    expect(popConfirm.style.display).toBe("none");
  });
});
