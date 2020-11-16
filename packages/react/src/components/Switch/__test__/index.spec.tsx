import React from "react";
import { render, mount } from "enzyme";
import { Switch, Size } from "..";

describe("Switch", () => {
  test("handle 'size' properly", () => {
    const acceptableSizes: Size[] = ["normal", "small"];
    acceptableSizes.forEach(size => {
      const wrapper = render(<Switch size={size} />);
      expect(wrapper.hasClass(`c-switch--${size}`));
    });
  });

  test("won't add additional class for incorrect 'size'", () => {
    const size: string = "a";
    // @ts-ignore
    const wrapper = render(<Switch size={size} />);
    expect(wrapper.hasClass(`.c-switch--${size}`)).toBe(false);
  });

  test("handle 'disabled' properly", () => {
    const wrapper = mount(<Switch />);

    expect(wrapper.render().find("input").is(":not([disabled])")).toBe(true);
    wrapper.setProps({ disabled: true });
    expect(wrapper.render().find("input").is("[disabled]")).toBe(true);
  });

  test("props.checked should be work first", () => {
    const checked: boolean = false;
    const wrapper = render(<Switch defaultChecked checked={checked} />);

    expect(wrapper.find("input").is(":not([checked])")).toBe(true);
  });

  test("should render correctly with (un)checkedChildren", () => {
    const props = {
      checkedChildren: "开",
      unCheckedChildren: "关"
    };
    const wrapperChecked = render(<Switch defaultChecked {...props} />);
    const wrapperUnChecked = render(<Switch {...props} />);
    expect(wrapperChecked.find(".c-switch__label").text()).toBe("开");
    expect(wrapperUnChecked.find(".c-switch__label").text()).toBe("关");
  });

  test("should render correctly with (un)checkedColor", () => {
    const wrapperUnChecked = render(<Switch unCheckedColor="#52B818" />);
    expect((wrapperUnChecked.html() || "").includes("background:#52B818")).toBe(
      true
    );
    const wrapperChecked = render(<Switch defaultChecked checkedColor="red" />);
    expect((wrapperChecked.html() || "").includes("background")).toBe(false);
  });

  test("should render correctly with labelId", () => {
    const wrapper = mount(
      <Switch checkedChildren="开" unCheckedChildren="关" />
    );
    expect(wrapper.find(".c-switch__label").getDOMNode()).toHaveProperty("id");
    wrapper.setProps({ unCheckedChildren: "" });
    expect(wrapper.find(".c-switch__label").getDOMNode()).toHaveProperty(
      "id",
      ""
    );
  });

  test("handle change trigger correctly", () => {
    const onChange = jest.fn();
    const wrapper = mount(<Switch onChange={onChange} />);

    wrapper.find("input").simulate("change");
    expect(onChange).toHaveBeenCalled();
  });
});
