import React from "react";
import { mount } from "enzyme";
import { Progress } from "..";

import {
  IconStatusDanger,
  IconStatusSuccess,
  IconClose,
  IconChecked
} from "@components/Icon";

describe("Progress", () => {
  test("LineNormal: should contain right style, className and text", () => {
    const value = 58;
    const wrapper = mount(<Progress value={value} />);
    expect(wrapper.hasClass("c-progress"));
    expect(wrapper.hasClass("c-progress--line"));
    expect(wrapper.find(".c-progress__bg").prop("style")).toHaveProperty(
      "height",
      "8px"
    );
    expect(wrapper.find(".c-progress__inner").prop("style")).toHaveProperty(
      "width",
      `${value}%`
    );
    expect(wrapper.find(".c-progress__text").text()).toBe(`${value}%`);
  });
  test("LineSmall: should contain right className and style", () => {
    const value = 58;
    const wrapper = mount(<Progress value={value} size="small" />);
    expect(wrapper.hasClass("c-progress--small"));
    expect(wrapper.find(".c-progress__bg").prop("style")).toHaveProperty(
      "height",
      "6px"
    );
  });
  test("LineStatus: should contain right status and textContent", () => {
    const value = 58;
    const LINE_ICON_STROKE_WIDTH = 1;
    const lineIconStyle = { strokeWidth: LINE_ICON_STROKE_WIDTH };
    const IconStatusSuccessDom = <IconStatusSuccess style={lineIconStyle} />;
    const IconStatusDangerDom = <IconStatusDanger style={lineIconStyle} />;
    const wrapper1 = mount(<Progress value={value} status="normal" />);
    const wrapper2 = mount(<Progress value={value} status="active" />);
    const wrapper3 = mount(<Progress value={value} status="success" />);
    const wrapper4 = mount(<Progress value={value} status="exception" />);
    expect(wrapper2.hasClass("c-progress--active"));
    expect(wrapper3.hasClass("c-progress--success"));
    expect(wrapper4.hasClass("c-progress--exception"));
    expect(wrapper1.find(".c-progress__text").text()).toBe(`${value}%`);
    expect(wrapper2.find(".c-progress__text").text()).toBe(`${value}%`);
    expect(wrapper3.find(".c-progress__text").contains(IconStatusSuccessDom));
    expect(wrapper4.find(".c-progress__text").contains(IconStatusDangerDom));
  });
  test("Circle: should contain right className", () => {
    const value = 58;
    const wrapper1 = mount(<Progress value={value} type="circle" />);
    const wrapper2 = mount(
      <Progress value={value} type="circle" size="small" />
    );
    expect(wrapper1.hasClass("c-progress--circle"));
    expect(wrapper2.hasClass("c-progress--small"));
  });
  test("CircleStatus: should contain right status and textContent", () => {
    const value = 58;
    const CIRCLE_NORMAL_ICON_STROKE_WIDTH = 3;
    const CIRCLE_SMALL_ICON_STROKE_WIDTH = 2;
    const circleIconNormalStyle = {
      strokeWidth: CIRCLE_NORMAL_ICON_STROKE_WIDTH
    };
    const circleIconSmallStyle = {
      strokeWidth: CIRCLE_SMALL_ICON_STROKE_WIDTH
    };
    const IconCheckedDom = <IconChecked style={circleIconNormalStyle} />;
    const IconCloseDom = <IconClose style={circleIconSmallStyle} />;
    const wrapper1 = mount(
      <Progress value={value} type="circle" status="active" />
    );
    const wrapper2 = mount(
      <Progress value={value} type="circle" status="success" />
    );
    const wrapper3 = mount(
      <Progress value={value} type="circle" size="small" status="exception" />
    );
    expect(wrapper1.find(".c-progress__text").text()).toBe(`${value}%`);
    expect(wrapper2.find(".c-progress__text").contains(IconCheckedDom));
    expect(wrapper3.find(".c-progress__text").contains(IconCloseDom));
  });
  test("CustomSize: should contain right width and strokeWidth", () => {
    const value = 58;
    const lineWidth = 200;
    const lineStrokeWidth = 5;
    const wrapper1 = mount(
      <Progress value={value} strokeWidth={lineStrokeWidth} width={lineWidth} />
    );
    expect(wrapper1.find(".c-progress--line").prop("style")).toHaveProperty(
      "width",
      `${lineWidth}px`
    );
    expect(wrapper1.find(".c-progress__bg").prop("style")).toHaveProperty(
      "height",
      `${lineStrokeWidth}px`
    );
  });
  test("CustomInfo: should contain right info", () => {
    const value = 68;
    const max = 100;
    const TextContent = `(${value}/${max})`;
    const wrapper1 = mount(
      <Progress
        value={value}
        strokeColor="#fea119"
        infoWidth={60}
        customInfo={TextContent}
      />
    );
    const wrapper2 = mount(<Progress value={value} showInfo={false} />);
    expect(wrapper1.find(".c-progress__text").contains(TextContent));
    expect(wrapper2.find(".c-progress__text")).toHaveLength(0);
  });
});
