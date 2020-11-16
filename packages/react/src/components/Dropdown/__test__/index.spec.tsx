import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Dropdown } from "..";
import { DEFAULT_DELAY } from "../lib/types";
import { overrideError } from "@src/utils";

const { Menu, Item } = Dropdown;

// mock timer
beforeAll(jest.useFakeTimers);
afterAll(jest.useRealTimers);

const DELAY = DEFAULT_DELAY;
describe("Dropdown", () => {
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

  test("onVisibilityChange should be called when using own state", () => {
    const onVisibilityChange = jest.fn();
    const { getByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        onVisibilityChange={onVisibilityChange}
      >
        <span>visibleChange</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    jest.advanceTimersByTime(DELAY);
    expect(onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(onVisibilityChange).lastCalledWith({ detail: { visible: true } });
    fireEvent.mouseLeave(button);
    jest.advanceTimersByTime(DELAY);
    expect(onVisibilityChange).toHaveBeenCalledTimes(2);
    expect(onVisibilityChange).lastCalledWith({ detail: { visible: false } });
  });

  test("`visible` from props has higher priority than state and `defaultVisible`", () => {
    const { getByText, queryByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        visible
        defaultVisible={false}
      >
        <span>props</span>
      </Dropdown>
    );
    const dropdown = queryByRole("menu");
    expect(dropdown).toBeTruthy();
    jest.advanceTimersByTime(DELAY);
    expect(dropdown).toBeTruthy();
    const button = getByText("props");
    fireEvent.mouseLeave(button);
    jest.advanceTimersByTime(DELAY);
    expect(dropdown).toBeTruthy();
  });

  test("handle `showDelay` and `hideDelay` correctly", () => {
    const SHOW_DELAY = 300;
    const HIDE_DELAY = 200;
    const { getByRole, queryByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        showDelay={SHOW_DELAY}
        hideDelay={HIDE_DELAY}
      >
        <span>button</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    let dropdownMenu = queryByRole("menu");
    expect(dropdownMenu).toBe(null);
    jest.advanceTimersByTime(SHOW_DELAY);
    dropdownMenu = queryByRole("menu");
    expect(dropdownMenu).toBeTruthy();
    fireEvent.mouseLeave(button);
    expect(dropdownMenu).toBeTruthy();
    jest.advanceTimersByTime(HIDE_DELAY);
    dropdownMenu = queryByRole("menu");
    expect(dropdownMenu).toBe(null);
  });

  test("debounce visibility correctly", () => {
    const { getByRole, queryByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        showDelay={DELAY}
      >
        <span>debounce button</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    jest.advanceTimersByTime(DELAY);
    const dropdownMenu = queryByRole("menu");
    expect(dropdownMenu).toBe(null);
  });

  test("show and hide immediately when showDelay and hideDelay equal 0", () => {
    const { getByRole, queryByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        showDelay={0}
        hideDelay={0}
      >
        <span>button</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    let dropdownMenu = queryByRole("menu");
    expect(dropdownMenu).toBeTruthy();
    fireEvent.mouseLeave(button);
    dropdownMenu = queryByRole("menu");
    expect(dropdownMenu).toBe(null);
  });

  test("handle click trigger correctly", () => {
    const { getByRole, queryByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <span>click</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    jest.advanceTimersByTime(DELAY);
    let dropdown = queryByRole("menu");
    expect(dropdown).toBeTruthy();
    fireEvent.click(button);
    jest.advanceTimersByTime(DELAY);
    dropdown = queryByRole("menu");
    expect(dropdown).toBeTruthy();
    fireEvent.click(document.body);
    jest.advanceTimersByTime(DELAY);
    dropdown = queryByRole("menu");
    expect(dropdown).toBe(null);
  });

  test("handle focus trigger correctly", () => {
    const { getByRole, queryByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        trigger={["focus"]}
      >
        <span>focus</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.focus(button);
    jest.advanceTimersByTime(DELAY);
    let dropdown = queryByRole("menu");
    expect(dropdown).toBeTruthy();
    fireEvent.blur(button);
    jest.advanceTimersByTime(DELAY);
    dropdown = queryByRole("menu");
    expect(dropdown).toBe(null);
  });

  test("handle hover trigger correctly", () => {
    const { getByRole, queryByRole } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
      >
        <span>hover</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    jest.advanceTimersByTime(DELAY);
    let dropdown = queryByRole("menu");
    expect(dropdown).toBeTruthy();
    fireEvent.mouseLeave(button);
    jest.advanceTimersByTime(DELAY);
    dropdown = queryByRole("menu");
    expect(dropdown).toBe(null);
  });

  test("original event remains the same", () => {
    const onClick = jest.fn();
    const onClickProps = {
      onClick: onClick
    };
    const { getByText } = render(
      <Dropdown
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <span {...onClickProps}>click</span>
      </Dropdown>
    );
    fireEvent.click(getByText("click"));
    expect(onClick).toBeCalled();
  });

  test("accept style and className and apply them properly", () => {
    const style: React.CSSProperties = {
      fontSize: "100px"
    };
    const className: string = "testClass";
    render(
      <Dropdown
        style={style}
        className={className}
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
      >
        <span>style</span>
      </Dropdown>
    );
    const button = document.querySelector(".c-dropdown") as HTMLElement;
    expect(button.style.fontSize).toBe("100px");
    expect(button.classList.contains(className)).toBe(true);
  });

  test("update placement-related attribute properly", () => {
    const { getByRole, queryByRole } = render(
      <Dropdown
        placement="top"
        overlay={
          <Menu>
            <Item>1</Item>
          </Menu>
        }
      >
        <span>placement</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    jest.advanceTimersByTime(DELAY);
    const dropdown = queryByRole("menu") as HTMLElement;
    expect(dropdown).toBeTruthy();
    expect(dropdown.getAttribute("x-placement")).toBe("top-center");
  });

  test("onClick should be called when items are clicked with click trigger", () => {
    const onClick = jest.fn();
    const { getByRole, queryAllByRole } = render(
      <Dropdown
        trigger={["click"]}
        overlay={
          <Menu onClick={onClick}>
            <Item itemKey="1">1</Item>
            <Item itemKey="2">2</Item>
            <Item itemKey="3">3</Item>
          </Menu>
        }
      >
        <span>onClick</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    jest.advanceTimersByTime(DELAY);
    const dropdownItemArr = queryAllByRole("menuitem");
    dropdownItemArr.forEach((item, i) => {
      fireEvent.click(item);
      expect(onClick).toHaveBeenCalledTimes(i + 1);
    });
  });

  test("onClick should be called when items are clicked without click trigger ", () => {
    const onClick = jest.fn();
    const { getByRole, queryAllByRole } = render(
      <Dropdown
        overlay={
          <Menu onClick={onClick}>
            <Item itemKey="1">1</Item>
            <Item itemKey="2">2</Item>
            <Item itemKey="3">3</Item>
          </Menu>
        }
      >
        <span>onClick</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    jest.advanceTimersByTime(DELAY);
    const dropdownItemArr = queryAllByRole("menuitem");
    dropdownItemArr.forEach((item, i) => {
      fireEvent.click(item);
      expect(onClick).toHaveBeenCalledTimes(i + 1);
    });
  });

  test("hideOnClick should be handled correctly", () => {
    const onClick = jest.fn();
    const { getByRole, queryByRole, queryAllByRole } = render(
      <Dropdown
        overlay={
          <Menu hideOnClick onClick={onClick}>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
          </Menu>
        }
      >
        <span>onClick</span>
      </Dropdown>
    );
    const button = getByRole("button");
    fireEvent.mouseEnter(button);
    jest.advanceTimersByTime(DELAY);
    const [dropdownItem] = queryAllByRole("menuitem");
    fireEvent.click(dropdownItem);
    jest.advanceTimersByTime(DELAY);
    const dropdownMenu = queryByRole("menu");
    expect(dropdownMenu).toBe(null);
  });
});
