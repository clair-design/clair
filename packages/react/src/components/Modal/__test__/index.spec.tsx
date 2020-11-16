import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Modal } from "..";

let wrapper!: ReactWrapper;

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

const TRANSITION_DURATION = 300;

afterEach(() => {
  if (wrapper) {
    try {
      wrapper.unmount();
    } catch (e) {}
  }
});

describe("Modal", () => {
  test("base modal structure", () => {
    wrapper = mount(<Modal visible />);
    expect(wrapper.find(".c-modal__container").prop("style")).toHaveProperty(
      "display",
      "block"
    );
    expect(wrapper.find(".c-modal")).toHaveLength(1);
    expect(wrapper.find(".c-modal__header")).toHaveLength(1);
    expect(wrapper.find("i.c-icon--close")).toHaveLength(1);
    expect(wrapper.find(".c-modal__body")).toHaveLength(1);
    expect(wrapper.find(".c-modal__footer")).toHaveLength(1);
    expect(wrapper.find(".c-modal__footer").find(".c-button")).toHaveLength(2);
  });
  test("modal visible", () => {
    wrapper = mount(<Modal visible={false} />);
    expect(wrapper.find(".c-modal__container").prop("style")).toHaveProperty(
      "display",
      "none"
    );
  });
  test("modal top prop", () => {
    const top = "20%";
    wrapper = mount(<Modal visible top={top} />);
    expect(wrapper.find(".c-modal").prop("style")).toHaveProperty("top", top);
  });
  test("modal center prop", () => {
    wrapper = mount(<Modal visible center />);
    expect(wrapper.find(".c-modal").prop("style")).toHaveProperty("top", "50%");
    expect(wrapper.find(".c-modal").prop("style")).toHaveProperty(
      "transform",
      "translateY(-50%)"
    );
  });
  test("modal width prop", () => {
    const width = "40%";
    wrapper = mount(<Modal visible width={width} />);
    expect(wrapper.find(".c-modal").prop("style")).toHaveProperty(
      "width",
      width
    );
  });
  test("modal title prop", () => {
    const text = "custom title";
    wrapper = mount(<Modal visible title={text} />);
    expect(wrapper.find(".c-modal__header").text().trim()).toBe(text);
  });
  test("modal custom header", () => {
    const title = <div className="custom-header">test</div>;
    wrapper = mount(<Modal visible title={title} />);
    expect(wrapper.find(".c-modal__header .custom-header")).toHaveLength(1);
    expect(wrapper.find(".c-modal__header .custom-header").text()).toBe("test");
  });
  test("modal custom footer", () => {
    const footer = <div className="custom-footer">这是一个自定义footer</div>;
    wrapper = mount(<Modal visible footer={footer} />);
    expect(wrapper.find(".c-modal__footer .custom-footer")).toHaveLength(1);
    expect(wrapper.find(".c-modal__footer button")).toHaveLength(0);
    expect(wrapper.find(".c-modal__footer .custom-footer").text()).toBe(
      "这是一个自定义footer"
    );
  });
  test("hide close icon", () => {
    wrapper = mount(<Modal showCloseIcon={false} visible />);
    expect(wrapper.find(".c-icon--close")).toHaveLength(0);
  });
  test("modal destroy after close", () => {
    wrapper = mount(<Modal visible={false} destroyAfterClose />);
    expect(wrapper.find(".c-modal__container")).toHaveLength(0);
  });
  test("modal custom class", () => {
    wrapper = mount(<Modal visible className="test" />);
    expect(wrapper.find(".c-modal.test")).toHaveLength(1);
  });
  test("modal light prop", () => {
    wrapper = mount(<Modal visible light />);
    expect(wrapper.find(".c-modal.c-modal--light")).toHaveLength(1);
  });
  test("modal style prop", () => {
    const style = { color: "red" };
    wrapper = mount(<Modal visible style={style} />);
    expect(wrapper.find(".c-modal").prop("style")).toHaveProperty(
      "color",
      "red"
    );
  });
  test("modal default focus", () => {
    wrapper = mount(<Modal visible />);
    expect(wrapper.find(".c-button--primary").is(":focus")).toBeTruthy();
  });
  test("base modal event", () => {
    const onConfirmClick = jest.fn();
    const onCancelClick = jest.fn();
    const {
      mock: { calls: onCancelClickCalls }
    } = onCancelClick;
    const getLastCancelClickArg = () =>
      onCancelClickCalls[onCancelClickCalls.length - 1][0];
    wrapper = mount(
      <Modal visible onConfirm={onConfirmClick} onCancel={onCancelClick} />
    );
    const mousedownEvent = new MouseEvent("mousedown", { bubbles: true });
    const modal = document.body.querySelector(
      ".c-modal__container"
    ) as HTMLElement;
    // confirm event
    wrapper.find(".c-button--primary").simulate("click");
    expect(onConfirmClick).toHaveBeenCalledTimes(1);
    // cancel event
    wrapper.find(".c-button--default").simulate("click");
    expect(onCancelClick).toHaveBeenCalledTimes(1);
    expect(getLastCancelClickArg()).toMatchObject({
      detail: { sourceType: "cancel" }
    });
    // click mask
    modal.dispatchEvent(mousedownEvent);
    expect(onCancelClick).toHaveBeenCalledTimes(2);
    expect(getLastCancelClickArg()).toMatchObject({
      detail: { sourceType: "mask" }
    });
    // click close button
    wrapper.find("i.c-icon--close").simulate("click");
    expect(onCancelClick).toHaveBeenCalledTimes(3);
    expect(getLastCancelClickArg()).toMatchObject({
      detail: { sourceType: "close" }
    });
    // esc
    document.body.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    expect(onCancelClick).toHaveBeenCalledTimes(4);
    expect(getLastCancelClickArg()).toMatchObject({
      detail: { sourceType: "esc" }
    });
  });
  test("modal tab event", () => {
    wrapper = mount(
      <Modal visible footer={null}>
        <a href="www.so.com" className="link">
          跳转
        </a>
        <button className="focus-btn">focus button</button>
        <button disabled>disabled</button>
      </Modal>
    );
    const tabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true
    });
    // transition will take 300ms to finish
    // if cannot get confirmRef
    // the last focus-able element within Modal should be focused
    jest.advanceTimersByTime(TRANSITION_DURATION);
    expect(document.querySelector(".focus-btn")).toEqual(
      document.activeElement
    );
    document.body.dispatchEvent(tabEvent);
    expect(document.activeElement).toEqual(
      document.querySelector(".c-modal__closeBtn")
    );
    document.body.dispatchEvent(tabEvent);
    expect(document.activeElement).toEqual(document.querySelector(".link"));
    document.body.dispatchEvent(tabEvent);
    expect(document.activeElement).toEqual(
      document.querySelector(".focus-btn")
    );
  });

  test("modal tab event when nothing to focus on", () => {
    wrapper = mount(
      <Modal visible footer={null}>
        nothing to focus on
      </Modal>
    );
    const tabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true
    });
    // transition will take 300ms to finish
    jest.advanceTimersByTime(TRANSITION_DURATION);
    expect(document.activeElement).toEqual(
      document.querySelector(".c-modal__closeBtn")
    );
    document.body.dispatchEvent(tabEvent);
    // since nothing to focus on, document.body should remain to be "focused"
    expect(document.activeElement).toEqual(
      document.querySelector(".c-modal__closeBtn")
    );
  });
  test("forbid mask click event", () => {
    const onCancelClick = jest.fn();
    wrapper = mount(
      <Modal maskClosable={false} visible onCancel={onCancelClick} />
    );
    const clickEvent = new MouseEvent("click", { bubbles: true });
    const dom = document.querySelector(".c-modal__container") as HTMLElement;
    dom.dispatchEvent(clickEvent);
    expect(onCancelClick).toHaveBeenCalledTimes(0);
  });
  test("unmount modal", () => {
    wrapper = mount(<Modal visible />);
    wrapper.unmount();
    expect(wrapper.find(".c-modal__container")).toHaveLength(0);
  });
  test("info modal", () => {
    Modal.info({ title: "test" });
    expect(document.querySelector(".c-modal.c-modal--light")).toBeTruthy();
    expect(document.querySelector(".c-icon--info")).toBeTruthy();
  });
  test("warning modal", () => {
    Modal.warning({ title: "test" });
    expect(document.querySelector(".c-modal.c-modal--light")).toBeTruthy();
    expect(document.querySelector(".c-icon--warning")).toBeTruthy();
  });
  test("success modal", () => {
    Modal.success({ title: "test" });
    expect(document.querySelector(".c-modal.c-modal--light")).toBeTruthy();
    expect(document.querySelector(".c-icon--success")).toBeTruthy();
  });
  test("error modal", () => {
    Modal.error({ title: "test" });
    expect(document.querySelector(".c-modal.c-modal--light")).toBeTruthy();
    expect(document.querySelector(".c-icon--error")).toBeTruthy();
  });
});
