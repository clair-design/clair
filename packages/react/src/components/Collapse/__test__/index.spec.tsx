import React, { useState } from "react";
import { CollapseItem, Collapse, CollapseProps } from "..";
import { render, fireEvent } from "@testing-library/react";

describe("[Collapse] basic", () => {
  it("should render 3 items", () => {
    const text = "label";
    const { getAllByText } = render(
      <Collapse>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
      </Collapse>
    );
    expect(getAllByText(text).length).toBe(3);
  });

  it("should only open 1 item", () => {
    const text = "label";
    const { getAllByRole } = render(
      <Collapse activeKeys={["1"]}>
        <CollapseItem itemKey="1">{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
      </Collapse>
    );

    const items = getAllByRole("button");
    expect(
      items.filter(item => item.getAttribute("aria-expanded") === "true").length
    ).toBe(1);
  });

  it("should only allow 1 item to be active when using accordion mode", () => {
    const text = "label";
    const { getAllByRole } = render(
      <Collapse accordion>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
      </Collapse>
    );

    const items = getAllByRole("button");
    fireEvent.click(items[0]);
    expect(items[0].getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(items[1]);
    expect(
      items.filter(item => item.getAttribute("aria-expanded") === "true").length
    ).toBe(1);
    expect(items[1].getAttribute("aria-expanded")).toBe("true");
  });

  it("cannot toggle disabled item", () => {
    const text = "label";
    const { getAllByRole } = render(
      <Collapse>
        <CollapseItem disabled>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
      </Collapse>
    );
    const items = getAllByRole("button");
    fireEvent.click(items[0]);
    expect(items[0].getAttribute("aria-expanded")).toBe("false");
    expect(items[0].getAttribute("aria-disabled")).toBe("true");
  });

  it("can be controlled", () => {
    const text = "label";
    function Demo() {
      const [activeKeys, setActiveKeys] = useState<string[]>([]);
      const onChange: CollapseProps["onChange"] = ({
        detail: { key, isActive }
      }) => {
        setActiveKeys(prevKeys => {
          if (isActive) {
            return prevKeys.concat(key);
          }
          return prevKeys.filter(k => k !== key);
        });
      };
      return (
        <Collapse activeKeys={activeKeys} onChange={onChange}>
          <CollapseItem>{text}</CollapseItem>
          <CollapseItem>{text}</CollapseItem>
          <CollapseItem>{text}</CollapseItem>
        </Collapse>
      );
    }
    const { getAllByRole } = render(<Demo />);
    const items = getAllByRole("button");
    expect(items[0].getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(items[0]);
    expect(items[0].getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(items[0]);
    expect(items[0].getAttribute("aria-expanded")).toBe("false");
  });

  it("should respond to keyboard event", () => {
    const text = "label";
    const { getAllByRole } = render(
      <Collapse>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
        <CollapseItem>{text}</CollapseItem>
      </Collapse>
    );
    const items = getAllByRole("button");
    expect(items[0].getAttribute("aria-expanded")).toBe("false");
    fireEvent.keyDown(items[0], {
      key: "Enter"
    });
    expect(items[0].getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(items[0], {
      key: " "
    });
    expect(items[0].getAttribute("aria-expanded")).toBe("false");
  });
});
