import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Input, TextArea, Password } from "..";
import { Types, Sizes } from "../lib/types";
import { overrideError } from "@src/utils";
import { IconSearch, IconSetting } from "@components/Icon";
let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});

describe("Input", () => {
  test("handle 'defaultValue' properly", () => {
    const firstValue = "first value";
    const secondValue = "second value";

    const { container } = render(<Input defaultValue={firstValue} />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe(firstValue);

    fireEvent.change(input, { target: { value: secondValue } });
    expect(input.value).toBe(secondValue);
  });

  test("handle 'value' properly", () => {
    const onChange = jest.fn(e => e.target.value);
    const firstValue = "firstValue";
    const secondValue = "secondValue";

    const { container } = render(
      <Input value={firstValue} onChange={onChange} />
    );
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe(firstValue);

    fireEvent.change(input, { target: { value: secondValue } });
    expect(onChange).toHaveReturnedWith(secondValue);
  });

  test("handle 'placeholder' properly", () => {
    const placeholder = "请输入内容";
    const { container } = render(<Input placeholder={placeholder} />);
    const input = container.querySelector("input") as HTMLInputElement;

    expect(input.placeholder).toBe(placeholder);
  });

  test("handle 'htmlType' properly", () => {
    const acceptHtmlType = ["text", "number", "password"];
    acceptHtmlType.forEach(htmlType => {
      const { container } = render(<Input htmlType={htmlType} />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.type).toBe(htmlType);
    });
  });

  test("handle 'type' properly", () => {
    const acceptType: Types[] = ["success", "warning", "error"];
    acceptType.forEach(type => {
      const { container } = render(<Input type={type} />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.classList.contains(`c-input--${type}`)).toBe(true);
    });
  });

  test("handle 'size' properly", () => {
    const acceptSize: Sizes[] = ["large", "normal", "small"];
    acceptSize.forEach(size => {
      const { container } = render(<Input size={size} />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.classList.contains(`c-input--${size}`)).toBe(true);
    });
  });

  test("handle 'disabled' properly", () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.disabled).toBeTruthy();
  });

  test("show 'prefixIcon' and 'suffixIcon' properly", () => {
    const prefixIcon = <IconSearch />;
    const suffixIcon = <IconSetting />;
    const { container } = render(
      <Input prefixIcon={prefixIcon} suffixIcon={suffixIcon} />
    );

    expect(container.querySelector(".c-input-prefix")).toBeTruthy();
    expect(container.querySelector(".c-input-suffix")).toBeTruthy();
  });

  test("show 'prefix' and 'suffix' properly", () => {
    const prefixText = "http://";
    const suffixText = ".com";
    const { getByText } = render(
      <Input
        prefix={<em className="prefix-text">{prefixText}</em>}
        suffix={<em className="suffix-text">{suffixText}</em>}
      />
    );

    expect(getByText(prefixText)).toBeTruthy();
    expect(getByText(suffixText)).toBeTruthy();
  });

  test("clear defaultValue", () => {
    const { container } = render(<Input clearable defaultValue="123" />);
    const input = container.querySelector("input") as HTMLInputElement;
    const clearBtn = container.querySelector(".c-icon--svg") as HTMLElement;

    fireEvent.click(clearBtn);

    expect(input.value).toBe("");
  });

  test("clear value", () => {
    const onChange = jest.fn(e => e.target.value);
    const { container } = render(
      <Input clearable value="123" onChange={onChange} />
    );
    const clearBtn = container.querySelector(".c-icon--svg") as HTMLElement;

    fireEvent.click(clearBtn);
    expect(onChange).toHaveReturnedWith("");
  });

  test("handle event properly", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onKeyDown = jest.fn();

    const { container } = render(
      <Input onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.focus(input);
    expect(onFocus).toBeCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toBeCalledTimes(1);

    fireEvent.keyDown(input);
    expect(onKeyDown).toBeCalledTimes(1);
  });
});

describe("Password", () => {
  test("allowToggle is true", () => {
    const { container } = render(<Password value="123" />);
    const input = container.querySelector("input") as HTMLInputElement;

    expect(input.type).toBe("password");
    fireEvent.click(container.querySelector(".c-icon--svg") as HTMLElement);
    expect(input.type).toBe("text");
    fireEvent.click(container.querySelector(".c-icon--svg") as HTMLElement);
    expect(input.type).toBe("password");
  });
  test("allowToggle is false", () => {
    const { container } = render(<Password value="1234" allowToggle={false} />);
    const input = container.querySelector("input") as HTMLInputElement;

    expect(input.type).toBe("password");
    expect(container.querySelector(".c-icon--svg")).toBeNull();
  });
});

describe("TextArea", () => {
  test("handle 'defaultValue' properly", () => {
    const firstValue = "first value";
    const secondValue = "second value";

    const { container } = render(<TextArea defaultValue={firstValue} />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.value).toBe(firstValue);

    fireEvent.change(textarea, { target: { value: secondValue } });
    expect(textarea.value).toBe(secondValue);
  });

  test("handle 'value' properly", () => {
    const onChange = jest.fn(e => e.target.value);
    const firstValue = "firstValue";
    const secondValue = "secondValue";

    const { container } = render(
      <TextArea value={firstValue} onChange={onChange} />
    );
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.value).toBe(firstValue);

    fireEvent.change(textarea, { target: { value: secondValue } });
    expect(onChange).toHaveReturnedWith(secondValue);
  });

  test("handle 'defaultRows' properly", () => {
    const { container } = render(<TextArea defaultRows={5} />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.rows).toBe(5);
  });

  test("handle event properly", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onKeyDown = jest.fn();

    const { container } = render(
      <TextArea onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />
    );

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    fireEvent.focus(textarea);
    expect(onFocus).toBeCalledTimes(1);

    fireEvent.blur(textarea);
    expect(onBlur).toBeCalledTimes(1);

    fireEvent.keyDown(textarea);
    expect(onKeyDown).toBeCalledTimes(1);
  });
});
