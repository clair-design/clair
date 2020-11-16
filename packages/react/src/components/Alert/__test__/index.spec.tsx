import React from "react";
import { render, mount } from "enzyme";
import { Alert, Type } from "..";
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

describe("Alert", () => {
  test("handle 'type' properly", () => {
    const acceptableTypes: Type[] = ["success", "error", "info", "warning"];
    acceptableTypes.forEach(type => {
      const wrapper = render(<Alert type={type}>This is a message.</Alert>);
      expect(wrapper.hasClass(`c-alert--${type}`)).toBe(true);
    });
  });

  test("won't add additional class for incorrect 'type'", () => {
    const type: string = "a";
    // @ts-ignore
    const wrapper = render(<Alert type={type}>This is a message.</Alert>);
    expect(wrapper.hasClass(`.c-alert--${type}`)).toBe(false);
  });

  test("showIcon is true", () => {
    const acceptableTypes: Type[] = ["success", "error", "info", "warning"];
    acceptableTypes.forEach(type => {
      const wrapper = render(
        <Alert type={type} showIcon>
          This is a message.
        </Alert>
      );
      expect(wrapper.find(`.c-icon--${type}`).length).toBe(1);
    });
  });

  test("showIcon is false", () => {
    const acceptableTypes: Type[] = ["success", "error", "info", "warning"];
    acceptableTypes.forEach(type => {
      const wrapper = render(
        <Alert type={type} showIcon={false}>
          This is a message.
        </Alert>
      );
      expect(wrapper.find(`.c-icon--${type}`).length).toBe(0);
    });
  });

  test("handle content properly", () => {
    const content = "This is a message.";
    const wrapper = render(<Alert>{content}</Alert>);
    expect(wrapper.find(".c-alert__content").text()).toBe(content);

    const contentNode = <div>This is a message.</div>;
    const wrapper2 = mount(<Alert>{contentNode}</Alert>);
    expect(wrapper2.contains(contentNode)).toBe(true);
  });

  test("handle title properly", () => {
    const title = "This is title.";
    const wrapper = render(<Alert title={title}>This is a message.</Alert>);
    expect(wrapper.find(".c-alert__title").text()).toBe(title);

    const titleNode = <div>This is title.</div>;
    const wrapper2 = mount(<Alert title={titleNode}>This is a message.</Alert>);
    expect(wrapper2.contains(titleNode)).toBe(true);
  });

  test("closable is true", () => {
    const wrapper = render(<Alert closable>This is a message.</Alert>);
    expect(wrapper.find("i.c-icon--close").length).toBe(1);
  });

  test("closable is false", () => {
    const wrapper = render(<Alert closable={false}>This is a message.</Alert>);
    expect(wrapper.find("i.c-icon--close").length).toBe(0);
  });

  test("handle onClose callback properly", () => {
    const onClose = jest.fn();
    const wrapper = <Alert onClose={onClose}>This is a message.</Alert>;
    const clickWrapper = mount(wrapper);
    clickWrapper.find("i.c-icon--close").simulate("click");
    expect(onClose).toBeCalled();
    expect(clickWrapper.html()).toBeNull();
  });
});
