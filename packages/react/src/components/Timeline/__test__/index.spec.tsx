import React from "react";
import { render } from "enzyme";
import { Timeline, TimelineItem } from "..";
import { IconClock } from "../../Icon";

describe("Timeline", () => {
  test("handle className properly", () => {
    // @ts-ignore
    const wrapper = render(<Timeline>Timeline</Timeline>);
    expect(wrapper.is(".c-timeline")).toBe(true);
  });

  test("handle placement properly", () => {
    // @ts-ignore
    const wrapper = render(<Timeline>Timeline</Timeline>);
    expect(wrapper.hasClass(`c-timeline--left`)).toBe(true);
    const centerWrapper = render(
      <Timeline placement="center">Timeline</Timeline>
    );
    expect(centerWrapper.hasClass(`c-timeline--center`)).toBe(true);
    const rightWrapper = render(
      <Timeline placement="right">Timeline</Timeline>
    );
    expect(rightWrapper.hasClass(`c-timeline--right`)).toBe(true);
  });
});

describe("TimelineItem", () => {
  test("handle className properly", () => {
    // @ts-ignore
    const wrapper = render(<TimelineItem>Item</TimelineItem>);
    expect(wrapper.is(".c-timeline-item")).toBe(true);
  });

  test("handle solid properly", () => {
    // @ts-ignore
    const wrapper = render(<TimelineItem solid>Item</TimelineItem>);
    expect(wrapper.find(".c-timeline-item__node--solid")).toHaveLength(1);
  });

  test("handle icon properly", () => {
    // @ts-ignore
    const wrapper = render(
      <TimelineItem icon={<IconClock />}>Item</TimelineItem>
    );
    expect(wrapper.find(".c-icon--svg")).toHaveLength(1);
  });
  // color
});
