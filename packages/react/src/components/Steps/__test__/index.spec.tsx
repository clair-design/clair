import React from "react";
import { render, mount } from "enzyme";
import { Step, Steps } from "..";
import { IconHome } from "../../Icon";

describe("Steps", () => {
  test("handle className properly", () => {
    const wrapper = render(
      <Steps>
        <Step stepKey="1" title="第一步" description="第一步的描述" />
        <Step stepKey="2" title="第二步" />
        <Step stepKey="3" title="第三步" />
        <Step stepKey="4" title="完成" />
      </Steps>
    );
    const count = 4;
    expect(wrapper.is(".c-steps")).toBe(true);
    expect(wrapper.find(".c-step")).toHaveLength(count);
    expect(wrapper.find(".c-step__desc")).toHaveLength(count);
    expect(wrapper.find(".c-step__title")).toHaveLength(count);
    expect(wrapper.find(".c-step__icon")).toHaveLength(count);
    expect(wrapper.is(".c-steps--horizontal")).toBe(true);
  });
  test("should show in a vertical direction", () => {
    const wrapper = render(
      <Steps isVertical>
        <Step stepKey="1" title="第一步" />
        <Step stepKey="2" title="第二步" />
        <Step stepKey="3" title="第三步" />
        <Step stepKey="4" title="完成" />
      </Steps>
    );
    expect(wrapper.find(".c-steps--horizontal")).toHaveLength(0);
    expect(wrapper.is(".c-steps--vertical")).toBe(true);
  });
  test("should show as a dot type", () => {
    const wrapper = render(
      <Steps isDot>
        <Step stepKey="1" title="第一步" />
        <Step stepKey="2" title="第二步" />
        <Step stepKey="3" title="第三步" />
        <Step stepKey="4" title="完成" />
      </Steps>
    );
    const count = 4;
    expect(wrapper.is(".c-steps--dotted")).toBe(true);
    expect(wrapper.find(".c-step__dot")).toHaveLength(count);
    expect(wrapper.find(".c-step__icon")).toHaveLength(0);
  });
  test(`should have different status for each step,
    and a "wait" status as default`, () => {
    const wrapper = mount(
      <Steps>
        <Step stepKey="1" title="第一步" status="finish" />
        <Step stepKey="2" title="第二步" status="process" />
        <Step stepKey="3" title="完成" />
      </Steps>
    );
    expect(wrapper.find(".c-step--finish")).toHaveLength(1);
    expect(wrapper.find(".c-step--process")).toHaveLength(1);
    expect(wrapper.find(".c-step--wait")).toHaveLength(1);
  });
  test("should set first step as active step as default", () => {
    const wrapper = mount(
      <Steps>
        <Step stepKey="1" title="第一步" />
        <Step stepKey="2" title="完成" />
      </Steps>
    );
    expect(wrapper.find(".c-step--process")).toHaveLength(1);
    expect(wrapper.find(".c-step--wait")).toHaveLength(1);
  });
  test("should have error status for some step", () => {
    const wrapper = render(
      <Steps>
        <Step stepKey="1" title="第一步" status="error" />
        <Step stepKey="2" title="完成" />
      </Steps>
    );
    expect(wrapper.find(".c-step--error")).toHaveLength(1);
  });
  test(`should set right status for each step if it has no status prop
    when steps be set activeKey`, () => {
    const wrapper = mount(
      <Steps activeKey="2">
        <Step stepKey="1" title="第一步" />
        <Step stepKey="2" title="第二步" />
        <Step stepKey="3" title="第三步" />
      </Steps>
    );
    expect(wrapper.find(".c-step--finish")).toHaveLength(1);
    expect(wrapper.find(".c-step--process")).toHaveLength(1);
    expect(wrapper.find(".c-step--wait")).toHaveLength(1);
  });
  test("should show right icon with custom", () => {
    const wrapper = render(
      <Steps activeKey="2">
        <Step stepKey="1" title="第一步" icon={<IconHome />} />
        <Step stepKey="2" title="第二步" />
        <Step stepKey="3" title="第三步" />
      </Steps>
    );
    expect(wrapper.find(".c-icon--svg")).toHaveLength(1);
  });
  test("should update activeKey accordingly", done => {
    function Test() {
      const [activeKey, updateActiveKey] = React.useState("2");

      const next = () => {
        const nextKey = (Number(activeKey) + 1).toString();
        updateActiveKey(nextKey);
      };
      return (
        <div className="steps-container">
          <p>
            <button onClick={next}>下一步</button>
          </p>
          <Steps activeKey={activeKey}>
            <Step stepKey="1" title="第一步" />
            <Step stepKey="2" title="第二步" />
            <Step stepKey="3" title="第三步" />
            <Step stepKey="4" title="完成" />
          </Steps>
        </div>
      );
    }
    const wrapper = mount(<Test />);
    expect(wrapper.find(".c-step--finish")).toHaveLength(1);
    expect(wrapper.find(".c-step--process")).toHaveLength(1);
    expect(wrapper.find(".c-step--wait")).toHaveLength(2);
    wrapper.find("button").simulate("click");
    expect(wrapper.find("button")).toHaveLength(1);
    const delay = 500;
    setTimeout(() => {
      expect(wrapper.find(".c-step--finish")).toHaveLength(2);
      expect(wrapper.find(".c-step--process")).toHaveLength(1);
      expect(wrapper.find(".c-step--wait")).toHaveLength(1);
      done();
    }, delay);
  });
});
