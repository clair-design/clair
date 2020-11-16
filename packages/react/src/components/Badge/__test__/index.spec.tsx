import React from "react";
import { render } from "enzyme";
import { Badge } from "..";

describe("Badge", () => {
  test("should be hidden when hidden is true", () => {
    const wrapper = render(<Badge hidden={true} />);
    expect(wrapper.find(".c-badge__content--hidden")).toHaveLength(1);
  });
  test("should show dot when isDot is true", () => {
    const wrapper = render(<Badge isDot={true}></Badge>);
    expect(wrapper.text() === "").toBe(true);
    expect(wrapper.find(".c-badge__content--dot")).toHaveLength(1);
  });
  test("should show value when isDot is false", () => {
    const wrapper = render(<Badge isDot={false} value="new" />);
    expect(wrapper.text() === "new").toBe(true);
  });
  test("should show value when max is not defined", () => {
    const wrapper = render(<Badge value={9} />);
    expect(wrapper.text() === "9").toBe(true);
  });
  test("should show value when value is max than bigger", () => {
    const wrapper = render(<Badge value={99} max={100} />);
    expect(wrapper.text() === "99").toBe(true);
  });
  test("should show max+ when value is bigger than max", () => {
    const wrapper = render(<Badge value={100} max={99} />);
    expect(wrapper.text() === "99+").toBe(true);
  });
});
