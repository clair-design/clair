import React, { SyntheticEvent, useState } from "react";
import { mount, shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { Checkbox, CheckboxGroup } from "..";

const defer = (): { promise: Promise<void>; resolve: () => void } => {
  const result: any = {};
  const promise: Promise<void> = new Promise(resolve => {
    result.resolve = resolve;
  });
  result.promise = promise;
  return result;
};

describe("Checkbox", () => {
  // clean up
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("uncontrolled checkbox", done => {
    const Test = () => <Checkbox>test</Checkbox>;
    const wrapper = mount(<Test />);
    (wrapper.find(".c-checkbox").getDOMNode() as HTMLInputElement).click();
    expect(
      (wrapper.find(".c-checkbox input").getDOMNode() as HTMLInputElement)
        .checked
    ).toBe(true);
    done();
  });

  test("controlled checkbox", done => {
    function Test() {
      const [checked, switchChecked] = useState(false);
      const testChange = ({
        target: { checked: c }
      }: {
        target: { checked: boolean };
      }) => {
        switchChecked(c);
      };
      return (
        <Checkbox checked={checked} onChange={testChange}>
          test
        </Checkbox>
      );
    }
    const wrapper = mount(<Test />);
    (wrapper
      .find(".c-checkbox input")
      .getDOMNode() as HTMLInputElement).click();
    expect(
      (wrapper.find(".c-checkbox input").getDOMNode() as HTMLInputElement)
        .checked
    ).toBe(true);
    done();
  });

  test("className property", () => {
    const wrapper = shallow(<Checkbox className="checkbox">test</Checkbox>);
    expect(wrapper.is(".c-checkbox.checkbox")).toBe(true);
  });

  test("style property", () => {
    const wrapper = mount(<Checkbox style={{ color: "white" }}>test</Checkbox>);
    // @ts-ignore
    const hasStyle = wrapper.getDOMNode().style.color === "white";
    expect(hasStyle).toBe(true);
  });

  test("size property", () => {
    const acceptableSizes = ["small", "normal", "large"] as const;
    acceptableSizes.forEach(size => {
      const wrapper = shallow(<Checkbox size={size}>test</Checkbox>);
      expect(wrapper.hasClass(`c-checkbox--${size}`)).toBe(true);
    });
  });

  test("checked property", () => {
    const wrapper = mount(<Checkbox checked={true}>test</Checkbox>);
    expect(
      (wrapper.find("input").getDOMNode() as HTMLInputElement).checked
    ).toBe(true);
  });

  test("defaultChecked property", () => {
    const wrapper = mount(<Checkbox defaultChecked={true}>test</Checkbox>);
    expect(
      (wrapper.find("input").getDOMNode() as HTMLInputElement).checked
    ).toBe(true);
  });

  test("indeterminate property", () => {
    const wrapper = mount(<Checkbox indeterminate={true}>test</Checkbox>);
    expect(
      (wrapper.find("input").getDOMNode() as HTMLInputElement).indeterminate
    ).toBe(true);
  });

  test("disabled property", () => {
    const wrapper = mount(<Checkbox disabled={true}>test</Checkbox>);
    expect(
      (wrapper.find("input").getDOMNode() as HTMLInputElement).disabled
    ).toBe(true);
  });

  test("won't add additional class for incorrect 'size'", () => {
    const size = "test";
    // @ts-expect-error
    const wrapper = shallow(<Checkbox size="test">test</Checkbox>);
    expect(wrapper.is(`.c-checkbox--${size}`)).toBe(false);
  });

  test("Group className property", () => {
    const wrapper = mount(
      <CheckboxGroup className="test">
        <Checkbox value="test">test</Checkbox>
      </CheckboxGroup>
    );
    expect(wrapper.getDOMNode().className === "c-checkbox-group test").toBe(
      true
    );
  });

  test("Group style property", () => {
    const wrapper = mount(
      <CheckboxGroup style={{ color: "white" }}>
        <Checkbox value="test" className="checkbox">
          test
        </Checkbox>
      </CheckboxGroup>
    );
    // @ts-ignore
    const hasStyle = wrapper.getDOMNode().style.color === "white";
    expect(hasStyle).toBe(true);
  });

  test("Group defaultValue property", () => {
    const wrapper = mount(
      <CheckboxGroup defaultValue={["a", "b"]}>
        <Checkbox value="a" className="checkbox">
          a
        </Checkbox>
        <Checkbox value="b" className="checkbox">
          b
        </Checkbox>
      </CheckboxGroup>
    );
    const list = wrapper.getDOMNode().querySelectorAll("input");
    expect(list[0].checked).toBe(true);
    expect(list[1].checked).toBe(true);
  });

  test("uncontrolled checkbox group", async done => {
    const d = defer();
    function Test() {
      const handleChange = () => d.resolve();
      return (
        <CheckboxGroup defaultValue={["a", "b"]} onChange={handleChange}>
          <Checkbox value="a">a</Checkbox>
          <Checkbox value="b">b</Checkbox>
        </CheckboxGroup>
      );
    }
    document.body.append(document.createElement("section"));
    mount(<Test />, { attachTo: document.querySelector("section") });
    const list = document.querySelectorAll(".c-checkbox input");
    (list[0] as HTMLInputElement).click();
    expect((list[0] as HTMLInputElement).checked).toBe(false);
    expect((list[1] as HTMLInputElement).checked).toBe(true);
    await d.promise;
    done();
  });

  test("checkbox group name attribute", async () => {
    const wrapper = mount(
      <CheckboxGroup name="hola">
        <Checkbox value="a" className="checkbox">
          a
        </Checkbox>
        <Checkbox value="b" className="checkbox">
          b
        </Checkbox>
      </CheckboxGroup>
    );
    const list = wrapper.getDOMNode().querySelectorAll("input");
    expect(list[0].name).toBe("hola");
    expect(list[1].name).toBe("hola");
  });

  test("controlled checkbox group", async done => {
    const d = defer();
    function Test() {
      const [val, updateVal] = useState(["a", "b"]);
      const handleChange = () => {
        updateVal(["d"]);
        d.resolve();
      };
      return (
        <CheckboxGroup value={val} onChange={handleChange}>
          <Checkbox value="a">a</Checkbox>
          <Checkbox value="b">b</Checkbox>
          <Checkbox value="c">c</Checkbox>
          <Checkbox value="d">d</Checkbox>
        </CheckboxGroup>
      );
    }

    document.body.append(document.createElement("section"));
    mount(<Test />, { attachTo: document.querySelector("section") });
    const list = document.querySelectorAll(".c-checkbox input");
    expect((list[0] as HTMLInputElement).checked).toBe(true);
    expect((list[1] as HTMLInputElement).checked).toBe(true);
    expect((list[2] as HTMLInputElement).checked).toBe(false);
    expect((list[3] as HTMLInputElement).checked).toBe(false);
    (document.querySelector(".c-checkbox") as HTMLElement).click();
    await d.promise;
    expect((list[0] as HTMLInputElement).checked).toBe(false);
    expect((list[1] as HTMLInputElement).checked).toBe(false);
    expect((list[2] as HTMLInputElement).checked).toBe(false);
    expect((list[3] as HTMLInputElement).checked).toBe(true);
    done();
  });

  test("onChange would receive `value`", () => {
    const fn = jest.fn();
    const onChange = (e: SyntheticEvent) => {
      e.persist();
      fn(e);
    };
    const value = "value";
    const Demo = () => {
      return (
        <Checkbox value={value} onChange={onChange}>
          test
        </Checkbox>
      );
    };
    const { getByRole } = render(<Demo />);
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(fn).toBeCalledTimes(1);
    const [lastArg] = fn.mock.calls.pop();
    expect(lastArg).toMatchObject({ target: { value } });
  });
});
