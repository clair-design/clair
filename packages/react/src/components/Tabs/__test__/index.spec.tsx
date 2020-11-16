import React, { useEffect, useState } from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { overrideError } from "@src/utils";
import { Tabs, TabPane } from "..";
import { TabPosition } from "@components/Tabs/lib/types";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});

describe("Tabs", () => {
  test("render correctly", () => {
    const text = "Tab1 Content";
    const text2 = "Tab2 Content";
    const { getByText } = render(
      <Tabs>
        <TabPane label="Tab1" tabKey="tab1">
          {text}
        </TabPane>
        <TabPane label="Tab2" tabKey="tab2">
          {text2}
        </TabPane>
      </Tabs>
    );
    expect(getByText(text)).toBeTruthy();
    expect(getByText(text2)).toBeTruthy();
  });
  test("`defaultActiveKey` should work", () => {
    const { getByText } = render(
      <Tabs defaultActiveKey="tab2">
        <TabPane tabKey="tab1" label="Tab1">
          Tab1 Content
        </TabPane>
        <TabPane tabKey="tab2" label="Tab2">
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    expect(getByText("Tab1 Content").hasAttribute("hidden")).toBe(true);
    expect(getByText("Tab2 Content").hasAttribute("hidden")).toBe(false);
  });
  test("can be controlled by `activeKey`", () => {
    const label = "Tab1";
    const label2 = "Tab2";
    const { getByText } = render(
      <Tabs activeKey="tab1">
        <TabPane tabKey="tab1" label={label}>
          Tab1 Content
        </TabPane>
        <TabPane tabKey="tab2" label={label2}>
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    const tab1 = getByText(label);
    const tab2 = getByText(label2);
    fireEvent.click(tab2);
    expect(tab1.getAttribute("aria-selected")).toBe("true");
    expect(tab2.getAttribute("aria-selected")).toBe("false");
  });
  test("invoke `onChange` as expected", () => {
    const onChange = jest.fn();
    const label = "tab1";
    const label2 = "tab2";
    const tabKey = label;
    const { getByText } = render(
      <Tabs onChange={onChange}>
        <TabPane tabKey={tabKey} label={label}>
          Tab1
        </TabPane>
        <TabPane tabKey="tab2" label={label2}>
          Tab2
        </TabPane>
      </Tabs>
    );
    const tab1 = getByText(label);
    fireEvent.click(tab1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith({ detail: { key: tabKey } });
  });
  test("can update `activeKey` with `onChange`", () => {
    const label = "tab1";
    const label2 = "tab2";
    function Demo() {
      const [activeKey, updateActiveKey] = useState("tab1");
      return (
        <Tabs
          activeKey={activeKey}
          onChange={({ detail: { key } }) => updateActiveKey(key)}
        >
          <TabPane tabKey="tab1" label={label}>
            Tab1
          </TabPane>
          <TabPane tabKey="tab2" label={label2}>
            Tab2
          </TabPane>
        </Tabs>
      );
    }
    const { getByText } = render(<Demo />);
    const tab2 = getByText(label2);
    fireEvent.click(tab2);
    expect(tab2.getAttribute("aria-selected")).toBe("true");
  });
  test("`lazy` should work", () => {
    const wrapper = render(
      <Tabs>
        <TabPane tabKey="tab1" label="Tab1">
          Tab1 Content
        </TabPane>
        <TabPane tabKey="tab2" label="Tab2" lazy>
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    expect(wrapper.getAllByRole("tabpanel").length).toBe(1);
  });
  test("`tabPosition` should work", () => {
    const positions: TabPosition[] = ["top", "bottom", "left", "right"];
    positions.forEach(position => {
      const { container } = render(
        <Tabs tabPosition={position}>
          <TabPane tabKey="tab1" label="Tab1">
            Tab1 Content
          </TabPane>
          <TabPane tabKey="tab2" label="Tab2">
            Tab2 Content
          </TabPane>
        </Tabs>
      );
      expect(
        container.firstElementChild?.className.includes(`c-tabs--${position}`)
      ).toBe(true);
      cleanup();
    });
  });
  test("`disabled` should work", () => {
    const { getByText } = render(
      <Tabs>
        <TabPane label="Tab1" tabKey="tab1">
          Tab1 Content
        </TabPane>
        <TabPane disabled label="Tab2" tabKey="tab2">
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    expect(getByText("Tab2").getAttribute("aria-disabled")).toBe("true");
  });
  test("click tab should work", () => {
    const { getByText, getByRole, getAllByRole } = render(
      <Tabs type="card">
        <TabPane label="Tab1" tabKey="tab1" disabled>
          Tab1 Content
        </TabPane>
        <TabPane label="Tab2" tabKey="tab2" closeable>
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    const tab1 = getByText("Tab1");
    const tab2 = getByText("Tab2");
    fireEvent.click(tab2);
    expect(getByText("Tab2 Content").hasAttribute("hidden")).toBe(false);
    // disabled tab won't react to click
    fireEvent.click(tab1);
    expect(getByText("Tab2").getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(getByText("Tab2"));
    // remove/close tabs by clicking close icon
    const tab2CloseButton = getByRole("button");
    fireEvent.click(tab2CloseButton);
    expect(getAllByRole("tab").length).toBe(1);
    expect(getByRole("tab")).toBe(tab1);
  });
  test("`closeable` should work when `type` is card", () => {
    const { getByText } = render(
      <Tabs type="card">
        <TabPane tabKey="tab1" label="Tab1" closeable>
          Tab1 Content
        </TabPane>
        <TabPane tabKey="tab2" label="Tab2">
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    expect(getByText("Tab1").classList.contains("c-tabs__item--closable")).toBe(
      true
    );
  });

  test("TabBar should respond to keydown event", () => {
    const label = "some label";
    const content = "some content";
    const label2 = "some label 2";
    const { getByText, getAllByRole } = render(
      <Tabs defaultActiveKey="tab2">
        <TabPane tabKey="tab1" label={label} closeable>
          {content}
        </TabPane>
        <TabPane tabKey="tab2" label={label2} closeable>
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    const labelElement = getByText(label);
    const paneElement = getByText(content);
    labelElement.focus();
    expect(document.activeElement).toBe(labelElement);
    expect(paneElement.hasAttribute("hidden")).toBe(true);
    fireEvent.keyDown(labelElement, {
      key: "Delete",
      bubbles: true
    });
    expect(getAllByRole("tab").length).toBe(1);
    expect(getByText(label).getAttribute("aria-selected")).toBe("true");
  });

  test("Tabs should respond to keydown event", () => {
    const label = "some label";
    const content = "some content";
    const label2 = "some label 2";
    const { getByText, getByRole } = render(
      <Tabs defaultActiveKey="tab2">
        <TabPane tabKey="tab1" label={label} closeable>
          {content}
        </TabPane>
        <TabPane tabKey="tab2" label={label2}>
          Tab2 Content
        </TabPane>
        <TabPane tabKey="tab3" label="tab3 label" disabled>
          Tab3 Content
        </TabPane>
      </Tabs>
    );
    const tabListElement = getByRole("tablist");
    const firstTab = getByText(label);
    const secondTab = getByText(label2);
    tabListElement.focus();
    fireEvent.keyDown(tabListElement, {
      key: "ArrowLeft"
    });
    expect(firstTab.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(tabListElement, {
      key: "End"
    });
    expect(secondTab.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(tabListElement, {
      key: "ArrowRight"
    });
    expect(firstTab.getAttribute("aria-selected")).toBe("true");
    expect(firstTab).toBe(document.activeElement);
    fireEvent.keyDown(tabListElement, {
      key: "Home"
    });
    expect(firstTab.getAttribute("aria-selected")).toBe("true");
    expect(firstTab).toBe(document.activeElement);
  });

  test("won't remove tabs by keyboard if it is not closeable", () => {
    const label = "Tab1";
    const { getAllByRole, getByText } = render(
      <Tabs>
        <TabPane tabKey="tab1" label={label}>
          Tab1 Content
        </TabPane>
        <TabPane tabKey="tab2" label="Tab2">
          Tab2 Content
        </TabPane>
      </Tabs>
    );
    const tab1Element = getByText(label);
    tab1Element.focus();
    fireEvent.keyDown(tab1Element, {
      key: "Delete"
    });
    expect(getAllByRole("tab").length).toBe(2);
  });

  test("can render tabs dynamically", () => {
    function Demo() {
      const [tabs, setTabs] = useState(() =>
        Array.from({ length: 3 }, (_, index) => `Tab${index}`)
      );
      const onClick = () => {
        setTabs(lastTabs => {
          return [
            ...lastTabs.slice(0, 1),
            `Tab${lastTabs.length}`,
            ...lastTabs.slice(1)
          ];
        });
      };
      return (
        <>
          <button onClick={onClick}>click</button>
          <Tabs>
            {tabs.map(key => (
              <TabPane tabKey={key} key={key} label={key}>
                {key} content
              </TabPane>
            ))}
          </Tabs>
        </>
      );
    }
    const { getByRole, getAllByRole } = render(<Demo />);
    const button = getByRole("button");
    const tabs = getAllByRole("tab");
    expect(tabs[1]?.textContent?.includes(`Tab1`)).toBe(true);
    fireEvent.click(button);
    const newTabs = getAllByRole("tab");
    expect(newTabs[1]?.textContent?.includes(`Tab3`)).toBe(true);
    expect(newTabs[newTabs.length - 1]?.textContent?.includes(`Tab2`)).toBe(
      true
    );
  });

  test("won't gain focus from bare rendering", done => {
    function Demo() {
      useEffect(() => {
        Promise.resolve().then(() => {
          expect(document.activeElement).toBe(document.body);
          done();
        });
      }, []);
      return (
        <Tabs>
          <TabPane tabKey="1" label="1"></TabPane>
          <TabPane tabKey="2" label="2"></TabPane>
        </Tabs>
      );
    }
    render(<Demo />);
  });
});
