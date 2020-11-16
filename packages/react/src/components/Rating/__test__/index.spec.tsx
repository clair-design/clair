/* eslint-disable no-magic-numbers */
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Rating } from "..";

let wrapper!: ReactWrapper;

afterEach(() => {
  if (wrapper) {
    try {
      wrapper.unmount();
    } catch (e) {}
  }
});

describe("Rating html structure", () => {
  test("rating with count & type heart", () => {
    const count = 6;
    wrapper = mount(
      <Rating count={count} value={2} defaultValue={3} type={"heart"} />
    );
    expect(wrapper.find(".c-rating")).toHaveLength(1);
    expect(wrapper.find(".c-rating__unit--heart")).toHaveLength(count);
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(2);
  });
  test("rating with size & color & defaultValue", () => {
    wrapper = mount(<Rating size={16} defaultValue={2} color={"#f00"} />);
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(2);
    expect(wrapper.find(".c-rating__unit--star")).toHaveLength(5);
    expect(
      wrapper.find(".c-rating__unit").first().prop("style")
    ).toHaveProperty("fontSize", "16px");
    expect(
      wrapper.find(".c-rating__unit").first().prop("style")
    ).toHaveProperty("color", "#f00");
  });
  test("rating with customChar", () => {
    wrapper = mount(
      <Rating type={"custom"} customChar={<span className="custom">C</span>} />
    );
    expect(wrapper.find(".custom")).toHaveLength(5);
  });
});
describe("Rating event", () => {
  test("rating with click & key left/right event", () => {
    const onChange = jest.fn();
    wrapper = mount(<Rating onChange={onChange} />);
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(0);
    // 选中第三个
    wrapper.find(".c-rating__unit").at(2).simulate("click");
    expect(onChange).toBeCalledTimes(1);
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(3);

    // 左移到第二个
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowLeft" });
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(2);
    // 继续左移多次
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowLeft" });
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowLeft" });
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowLeft" });
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(0);
    // 空状态不可选中
    wrapper.find(".c-rating").simulate("keydown", { key: "Enter" });
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(0);
    // 右移两次
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowRight" });
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowRight" });
    wrapper.find(".c-rating").simulate("keydown", { key: " " });
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(2);
    // 右移多次
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowRight" });
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowRight" });
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowRight" });
    wrapper.find(".c-rating").simulate("keydown", { key: "ArrowRight" });
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(5);
    // blur之后还原为actual
    wrapper.find(".c-rating").simulate("keydown", { key: "Tab" });
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(2);
    wrapper.find(".c-rating").simulate("keydown", { key: "A" });
  });
  test("rating with mouse event", () => {
    const onActiveChange = jest.fn();
    wrapper = mount(<Rating onActiveChange={onActiveChange} />);
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(0);

    // 鼠标移入第四个
    wrapper.find(".c-rating__unit").at(3).simulate("mouseenter");
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(4);
    expect(onActiveChange).toBeCalledTimes(1);
    // 选中第三个
    wrapper.find(".c-rating__unit").at(2).simulate("click");
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(3);
    // 鼠标移出, 还原为actual
    wrapper.find(".c-rating").simulate("mouseleave");
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(3);
    expect(onActiveChange).toBeCalledTimes(1);
  });
});
describe("Rating readonly", () => {
  test("rating with readonly", () => {
    const onChange = jest.fn();
    const onActiveChange = jest.fn();
    wrapper = mount(
      <Rating onActiveChange={onActiveChange} onChange={onChange} readonly />
    );

    // 鼠标移入第四个
    wrapper.find(".c-rating__unit").at(3).simulate("mouseenter");
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(0);
    expect(onActiveChange).toBeCalledTimes(0);

    // 鼠标点击第三个
    wrapper.find(".c-rating__unit").at(2).simulate("click");
    expect(wrapper.find("[aria-checked=true]")).toHaveLength(0);
    expect(onChange).toBeCalledTimes(0);
  });
  test("rating with readonly & float value", () => {
    wrapper = mount(<Rating value={3.7} readonly />);

    expect(wrapper.find("[aria-checked=true]")).toHaveLength(3);
    expect(wrapper.find(".c-rating__part")).toHaveLength(1);
    // expect(
    //   wrapper
    //     .find(".c-rating__part")
    //     .first()
    //     .prop("style")
    // ).toHaveProperty("width", "70%");
  });
});
