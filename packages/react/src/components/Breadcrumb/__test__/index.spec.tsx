import React from "react";
import { mount } from "enzyme";
import { Breadcrumb, BreadcrumbItem } from "..";

describe("Breadcrumb", () => {
  test("breadcrumb should accept different separators", () => {
    const wrapper = mount(
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <a href="/">Page</a>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find(".c-breadcrumb__separator").text()).toEqual(">");
  });

  test("breadcrumbItem should accept many children", () => {
    const wrapper = mount(
      <Breadcrumb>
        <BreadcrumbItem>
          <span>
            <a href="/">Page1</a>
            <a href="/">Page2</a>
          </span>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find(".c-breadcrumb__item a").length).toEqual(2);
  });

  test("breadcrumbItem should accept many children", () => {
    const wrapper = mount(
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/page1">Page1</a>
          <a href="/page2">Page2</a>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find(".c-breadcrumb__item a").length).toEqual(2);
  });

  test("breadcrumbItem should accept empty child", () => {
    const wrapper = mount(
      <Breadcrumb>
        <BreadcrumbItem />
      </Breadcrumb>
    );
    expect(wrapper.find(".c-breadcrumb__item").length).toEqual(1);
  });

  test("breadcrumbItem should accept string", () => {
    const wrapper = mount(
      <Breadcrumb>
        <BreadcrumbItem href="/">Page</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find(".c-breadcrumb__item").text()).toEqual("Page/");
  });

  test("breadcrumbItem should accept element", () => {
    const wrapper = mount(
      <Breadcrumb>
        <BreadcrumbItem>
          <span>Page</span>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find(".c-breadcrumb__item").text()).toEqual("Page/");
  });
});
