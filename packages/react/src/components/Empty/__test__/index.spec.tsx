import React from "react";
import { mount, render } from "enzyme";
import { overrideError } from "@src/utils";
import { Empty } from "..";

let recoverError: null | Function = null;

beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});

describe("Empty", () => {
  test("should custom description", () => {
    const desc = "custom description";
    const wrapper = mount(<Empty description={desc} />);
    expect(wrapper.find(".c-empty__description").text()).toBe(desc);
  });

  test("should be large when set large size", () => {
    const wrapper = render(<Empty size="large" />);
    expect(wrapper.hasClass("c-empty--large")).toBe(true);
  });

  test("image style should change", () => {
    const wrapper = render(<Empty imgStyle={{ width: 80 }} />);
    expect(wrapper.find(".c-empty__img").attr().style).toBe("width:80px");
  });

  test("should have custom class name", () => {
    const wrapper = render(<Empty className="custom-class" />);
    expect(wrapper.hasClass("custom-class")).toBe(true);
  });

  test("should have custom style", () => {
    const wrapper = render(<Empty style={{ width: 100 }} />);
    expect(wrapper.attr().style).toBe("width:100px");
  });
});
