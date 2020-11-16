import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button, Type, HtmlType, Size } from "..";
import { overrideError } from "@src/utils";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});

const cleanUp = () => (document.body.innerHTML = "");

describe("Button", () => {
  test("handle className properly", () => {
    const { getByText } = render(<Button className="button">button</Button>);
    expect(getByText("button").classList.contains("button")).toBe(true);
  });

  test("handle 'type' properly", () => {
    const acceptableTypes: Type[] = ["primary", "default", "warning", "danger"];
    acceptableTypes.forEach(type => {
      const { getByText } = render(<Button type={type}>button</Button>);
      expect(getByText("button").classList.contains(`c-button--${type}`)).toBe(
        true
      );
      cleanUp();
    });
  });

  test("won't add additional class for incorrect 'type'", () => {
    const type: string = "a";
    // @ts-ignore
    const { getByText } = render(<Button type={type}>type</Button>);
    expect(getByText("type").classList.contains(`c-button--${type}`)).toBe(
      false
    );
  });

  test("handle 'size' properly", () => {
    const acceptableSizes: Size[] = ["large", "normal", "small"];
    acceptableSizes.forEach(size => {
      const { getByText } = render(<Button size={size}>size</Button>);
      expect(getByText("size").classList.contains(`c-button--${size}`)).toBe(
        true
      );
      cleanUp();
    });
  });

  test("won't add additional class for incorrect 'size'", () => {
    const size: string = "a";
    // @ts-ignore
    const { getByText } = render(<Button size={size}>size</Button>);
    expect(getByText("size").classList.contains(`c-button--${size}`)).toBe(
      false
    );
  });

  test("handle 'htmlType' properly", () => {
    const acceptableHtmlTypes: HtmlType[] = ["button", "reset", "submit"];
    acceptableHtmlTypes.forEach(htmlType => {
      const { getByText } = render(<Button htmlType={htmlType}>html</Button>);
      expect(getByText("html").getAttribute("type") === htmlType).toBe(true);
      cleanUp();
    });
  });

  test("handle 'block' properly", () => {
    const { getByText } = render(<Button>normal</Button>);
    expect(getByText("normal").classList.contains("c-button--block")).toBe(
      false
    );
    const { getByText: blockGetByText } = render(<Button block>block</Button>);
    expect(blockGetByText("block").classList.contains("c-button--block")).toBe(
      true
    );
  });

  test("handle 'loading' properly", () => {
    const { getByText } = render(<Button>normal</Button>);
    expect(getByText("normal").classList.contains("c-button--loading")).toBe(
      false
    );
    const { getByText: loadingGetByText } = render(
      <Button loading>loading</Button>
    );
    expect(
      loadingGetByText("loading").classList.contains("c-button--loading")
    ).toBe(true);
  });

  test("handle 'disabled' properly", () => {
    const { getByText } = render(<Button>normal</Button>);
    expect((getByText("normal") as HTMLButtonElement).disabled).toBe(false);
    const { getByText: disabledGetByText } = render(
      <Button disabled>disabled</Button>
    );
    expect((disabledGetByText("disabled") as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  test("handle event properly", () => {
    const textContent: string = "button";
    const callBack = (e: React.MouseEvent) =>
      expect((e.target as HTMLButtonElement).textContent).toBe(textContent);
    const events = {
      onClick: callBack,
      onSubmit: callBack,
      onReset: callBack
    };
    const { getByText } = render(<Button {...events}>{textContent}</Button>);
    fireEvent.click(getByText(textContent));
    cleanUp();
    const { getByText: submitGetByText } = render(
      <Button {...events} htmlType="submit">
        {textContent}
      </Button>
    );
    fireEvent.submit(submitGetByText(textContent));
    cleanUp();
    const { getByText: resetGetByText } = render(
      <Button {...events} htmlType="reset">
        {textContent}
      </Button>
    );
    fireEvent(resetGetByText(textContent), new Event("reset"));
  });
});
