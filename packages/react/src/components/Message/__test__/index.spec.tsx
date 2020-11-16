import React from "react";
import { shallow, mount } from "enzyme";
import { message } from "@src/index";
import {
  Type,
  TRANSITION_DURATION,
  Message
} from "@components/Message/lib/Message";
import { getStatusIcon } from "@components/Icon";
import { overrideError } from "@src/utils";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
  jest.useFakeTimers();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
  jest.useRealTimers();
});

describe("Message", () => {
  test("handle 'type' properly", () => {
    const acceptableTypes: Type[] = ["info", "success", "warning", "error"];
    acceptableTypes.forEach(type => {
      const wrapper = shallow(<Message type={type}>test</Message>);
      expect(wrapper.contains(getStatusIcon(type))).toBe(true);
    });
  });
  test("won't add additional class for incorrect 'type'", () => {
    const type: string = "whatever";
    // @ts-ignore
    const wrapper = shallow(<Message type={type}>test</Message>);
    // @ts-ignore
    expect(wrapper.contains(getStatusIcon(type))).toBe(false);
  });

  test("duration config works", () => {
    const duration: number = 100;
    message({ message: "duration", duration });
    jest.advanceTimersByTime(TRANSITION_DURATION);
    expect(document.querySelectorAll(".c-message").length).toEqual(1);
    jest.advanceTimersByTime(duration + TRANSITION_DURATION + 1);
    expect(document.querySelectorAll(".c-message").length).toEqual(0);
  });

  test("close all works", () => {
    const messageCount: number = 10;
    new Array(messageCount).fill(0).forEach(() => {
      message({
        message: "message"
      });
    });
    expect(document.querySelectorAll(".c-message").length).toBe(messageCount);
    message.closeAll();
    expect(document.querySelectorAll(".c-message").length).toBe(0);
  });

  test("render message correctly", () => {
    const text = "this is message";
    const TextNode = <span>{text}</span>;
    const duration: number = 100;
    message({
      message: TextNode,
      duration
    });
    jest.advanceTimersByTime(TRANSITION_DURATION);
    const span = document.querySelector(".c-message span") as HTMLElement;
    expect(span.textContent).toEqual(text);
    message.closeAll();
  });

  test("support syntax sugar", () => {
    const duration: number = 100;
    const types: Type[] = ["success", "error", "info", "warning"];
    types.forEach(type => {
      message[type]({
        message: type,
        duration
      });
    });
    jest.advanceTimersByTime(TRANSITION_DURATION);
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      const icon = document.querySelectorAll("i[class*='icon']")[
        i
      ] as HTMLElement;
      const className = `c-icon--${type}`;
      expect(icon.classList.contains(className)).toBe(true);
    }

    jest.advanceTimersByTime(duration + TRANSITION_DURATION);
    expect(document.querySelectorAll(".c-message").length).toBeFalsy();
  });

  test("delay disappear accordingly", () => {
    const duration: number = 100;
    const onClose = jest.fn();
    const Component = () => {
      return (
        <div>
          <Message duration={duration} onClose={onClose}>
            message
          </Message>
        </div>
      );
    };
    const wrapper = mount(<Component />);
    const messageComponent = wrapper.find(".c-message");
    messageComponent.simulate("mouseenter");
    expect(onClose).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(duration + TRANSITION_DURATION);
    messageComponent.simulate("mouseenter");
    expect(onClose).toHaveBeenCalledTimes(0);
    messageComponent.simulate("mouseleave");
    jest.advanceTimersByTime(
      duration + TRANSITION_DURATION + TRANSITION_DURATION
    );
    expect(onClose).toHaveBeenCalledTimes(1);
    message.closeAll();
  });

  test("config api works", () => {
    const duration: number = 100;
    message.config({
      top: "1px",
      duration
    });
    message({
      message: "top 1px"
    });
    const container = document.querySelector(
      ".c-message-container"
    ) as HTMLElement;
    expect(document.querySelectorAll(".c-message-container").length).toBe(1);
    expect(container.style.top).toBe("1px");
    message.closeAll();
  });
});
