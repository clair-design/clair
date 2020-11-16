import React from "react";
import { render, mount } from "enzyme";
import { Card } from "..";

describe("Card", () => {
  test("Basic: should contain right title/content/actions", () => {
    const title = "这是标题";
    const actions = "这是操作";
    const content = "这是内容";
    const wrapper = mount(
      <Card title={title} actions={actions}>
        {content}
      </Card>
    );
    expect(wrapper.find("h3.c-card__title").contains(title)).toBeTruthy();
    expect(wrapper.find(".c-card__action").contains(actions)).toBeTruthy();
    expect(wrapper.find(".c-card__body").contains(content)).toBeTruthy();
  });
  test("Raised: should contain class of raised", () => {
    const title = "这是标题";
    const actions = "这是操作";
    const content = "这是内容";
    const wrapper = render(
      <Card title={title} actions={actions} raised>
        {content}
      </Card>
    );
    expect(wrapper.hasClass("c-card--raised"));
  });
  test("Simple: should contain content only", () => {
    const content = [
      <span key="1">这是内容1</span>,
      <span key="2">这是内容2</span>
    ];
    const wrapper = mount(<Card>{content}</Card>);
    expect(wrapper.contains("h3.c-card__title")).toBe(false);
    expect(wrapper.contains("c-card__action")).toBe(false);
    expect(wrapper.contains(".c-card__cover")).toBe(false);
    expect(wrapper.find(".c-card__body").contains(content)).toBeTruthy();
  });
  test("Cover: should contain cover content", () => {
    const title = "这是标题";
    const actions = "这是操作";
    const content = "这是内容";
    const cover = (
      <img alt="" src="https://p4.ssl.qhimg.com/t01c1fc52a32d91bd6e.png" />
    );
    const wrapper = mount(
      <Card title={title} actions={actions} cover={cover}>
        {content}
      </Card>
    );
    expect(wrapper.find(".c-card__cover").contains(cover)).toBeTruthy();
  });
});
