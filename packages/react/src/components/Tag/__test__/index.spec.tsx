import React, { useEffect, useRef } from "react";
import { render, mount } from "enzyme";
import { Tag, Size, Color } from "..";
import { overrideError } from "@src/utils";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});
describe("Tag", () => {
  test("handle className properly", () => {
    // @ts-ignore
    const wrapper = render(<Tag className="tag">Tag</Tag>);
    expect(wrapper.is(".c-tag.tag")).toBe(true);
  });

  test("won't add additional class for incorrect built-in 'color'", () => {
    const color: string = "a";
    // @ts-ignore
    const wrapper = render(<Tag color={color}>Tag</Tag>);
    expect(wrapper.hasClass(`.c-tag--${color}`)).toBe(false);
  });

  test("handle built-in 'color' properly", () => {
    const acceptColor: Color[] = [
      "blue",
      "green",
      "orange",
      "red",
      "purple",
      "grey",
      "cyan",
      "magenta"
    ];
    acceptColor.forEach(color => {
      const wrapper = render(<Tag color={color} />);
      expect(wrapper.hasClass(`c-tag--${color}`)).toBe(true);
    });
  });

  test("handle 'size' properly", () => {
    const acceptSizes: Size[] = ["large", "normal", "small"];
    acceptSizes.forEach(size => {
      // @ts-ignore
      const wrapper = render(<Tag size={size} />);
      expect(wrapper.hasClass(`c-tag--${size}`));
    });
  });

  test("won't add additional class for incorrect 'size'", () => {
    const size: string = "a";
    // @ts-ignore
    const wrapper = render(<Tag size={size}>Tag</Tag>);
    expect(wrapper.hasClass(`.c-tag--${size}`)).toBe(false);
  });

  test("closable is true", () => {
    // @ts-ignore
    const wrapper = mount(<Tag closable>Tag</Tag>);
    expect(wrapper.find("i.c-icon--close-tag")).toHaveLength(1);
  });

  test("closable is false", () => {
    // @ts-ignore
    const wrapper = mount(<Tag closable={false}>Tag</Tag>);
    expect(wrapper.find("i.c-icon--close-tag")).toHaveLength(0);
  });

  test("handle content properly", () => {
    const content = "This is a tag.";
    // @ts-ignore
    const wrapper = mount(<Tag>{content}</Tag>);
    expect(wrapper.find(".c-tag__label").text()).toBe(content);

    const contentNode = <div>This is a tag.</div>;
    // @ts-ignore
    const wrapper2 = mount(<Tag>{contentNode}</Tag>);
    expect(wrapper2.contains(contentNode)).toBe(true);
  });

  test("handle onClose properly", () => {
    const onClose = jest.fn();
    const wrapper = mount(
      // @ts-ignore
      <Tag closable onClose={onClose}>
        Tag
      </Tag>
    );
    wrapper.find("i.c-icon--close-tag").simulate("click");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(wrapper.html()).toBeNull();
  });

  test("visibility can be controlled", () => {
    const wrapper = mount(
      <Tag visible closable>
        Tag
      </Tag>
    );
    expect(wrapper.find(Tag).html()).toBeTruthy();
    // won't disappear after close it
    wrapper.find("i.c-icon--close-tag").simulate("click");
    expect(wrapper.find(Tag).html()).toBeTruthy();
  });

  test("react to common event", () => {
    const fn = jest.fn();
    const wrapper = mount(<Tag onClick={fn}>Tag</Tag>);
    wrapper.find(Tag).simulate("click");
    expect(fn).toBeCalledTimes(1);
    wrapper.find(Tag).simulate("click");
    expect(fn).toBeCalledTimes(2);
  });

  test("have access to DOM", () => {
    expect.assertions(1);
    const Component = () => {
      const ref = useRef(null);
      useEffect(() => {
        // @ts-ignore
        expect(ref.current instanceof Element).toBe(true);
      }, []);
      return <Tag ref={ref}>Tag</Tag>;
    };
    mount(<Component />);
  });
});
