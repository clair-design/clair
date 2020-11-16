/* eslint-disable no-magic-numbers */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Menu, MenuItem, SubMenu, MenuItemGroup } from "..";

const querySelector = document.querySelector.bind(document);
const querySelectorAll = document.querySelectorAll.bind(document);

const getFocusHTML = () =>
  querySelector(".c-menu-item--focus .c-menu-item__inner")?.innerHTML ||
  (querySelector(".c-submenu__title--focus .c-menu-item__inner") as HTMLElement)
    ?.innerHTML;

const getActiveHTML = () =>
  querySelector(".c-menu-item--active .c-menu-item__inner")?.innerHTML;

describe("Menu html structure", () => {
  test("base controlled menu", () => {
    render(
      <Menu activeIndex={1} theme="dark">
        <MenuItem index={1}>一级导航 1</MenuItem>
      </Menu>
    );
    expect(getActiveHTML()).toBe("一级导航 1");

    expect(querySelectorAll(".c-menu--dark")).toHaveLength(1);
  });
  test("group menu", () => {
    render(
      <Menu>
        <MenuItem index={1}>一级导航 1</MenuItem>
        <SubMenu title={<React.Fragment>一级导航 2</React.Fragment>} index={2}>
          <MenuItem index={"2-1"}>二级导航 1</MenuItem>
          <MenuItem index={"2-2"}>二级导航 2</MenuItem>
          <MenuItemGroup title="分组">
            <MenuItem index={"2-3"}>二级导航 3</MenuItem>
            <MenuItem index={"2-4"}>二级导航 4</MenuItem>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
    const group = querySelector(".c-menu-item-group");
    expect(group).toBeTruthy();
    expect(group?.querySelectorAll(".c-menu-item")).toHaveLength(2);
  });
  test("menu with submenu", () => {
    const onSelect = jest.fn();
    const { getAllByRole } = render(
      <Menu onSelect={onSelect}>
        <MenuItem index={1}>一级导航 1</MenuItem>
        <SubMenu title={<React.Fragment>一级导航 2</React.Fragment>} index={2}>
          <MenuItem index={"2-1"}>二级导航 1</MenuItem>
          <MenuItem index={"2-2"}>二级导航 2</MenuItem>
        </SubMenu>
        <MenuItem index={3} disabled>
          一级导航 3
        </MenuItem>
      </Menu>
    );
    const [, submenu, , item3] = getAllByRole("menuitem");
    fireEvent.click(item3);
    expect(onSelect).toBeCalledTimes(0);

    fireEvent.mouseEnter(submenu);
    const popover = querySelector<HTMLElement>("[role=dialog]");
    const submenuItem = popover?.querySelectorAll<HTMLElement>(".c-menu-item");
    expect(submenuItem).toHaveLength(2);
    expect(popover?.style?.display).toBe("block");

    const item = submenuItem?.[0] as HTMLElement;
    fireEvent.click(item);
    expect(onSelect).toBeCalledTimes(1);

    expect(getActiveHTML()).toBe("二级导航 1");
    expect(popover?.style?.display).toBe("none");
  });
  test("horizon menu keyboard event", () => {
    const { getAllByRole } = render(
      <Menu activeIndex={"2-1"}>
        <MenuItem index={1}>一级导航 1</MenuItem>
        <SubMenu title={<React.Fragment>一级导航 2</React.Fragment>} index={2}>
          <MenuItem index={"2-1"}>二级导航 1</MenuItem>
          <MenuItem index={"2-2"}>二级导航 2</MenuItem>
          <SubMenu
            title={<React.Fragment>二级导航 3</React.Fragment>}
            index={"2-3"}
          >
            <MenuItem index={"2-3-1"}>三级导航 1</MenuItem>
          </SubMenu>
        </SubMenu>
        <MenuItem index={3}>一级导航 3</MenuItem>
        <MenuItem index={4} disabled>
          一级导航 4
        </MenuItem>
      </Menu>
    );

    const popover = querySelector<HTMLElement>("[role=dialog]");
    const [menu] = getAllByRole("menu");

    fireEvent.focus(menu);
    expect(popover?.style?.display).toBe("block");
    expect(getFocusHTML()).toBe("二级导航 1");

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toBe("二级导航 2");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "ArrowRight" });
    expect(getFocusHTML()).toBe("三级导航 1");

    fireEvent.keyDown(menu, { key: "ArrowLeft" });
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(getFocusHTML()).toBe("二级导航 2");

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(getFocusHTML()).toContain("二级导航 3");
    fireEvent.keyDown(menu, { key: "ArrowUp" });

    fireEvent.keyDown(menu, { key: "ArrowRight" });
    expect(getFocusHTML()).toBe("一级导航 3");

    fireEvent.keyDown(menu, { key: "ArrowRight" });
    expect(getFocusHTML()).toBe("一级导航 1");

    fireEvent.keyDown(menu, { key: "ArrowRight" });
    fireEvent.keyDown(menu, { key: "Enter" });
    expect(getFocusHTML()).toBe("二级导航 1");

    fireEvent.keyDown(menu, { key: "ArrowLeft" });
    expect(getFocusHTML()).toBe("一级导航 1");

    fireEvent.keyDown(menu, { key: "ArrowLeft" });
    expect(getFocusHTML()).toBe("一级导航 3");

    fireEvent.keyDown(menu, { key: "Enter" });
    expect(getActiveHTML()).toBe("二级导航 1");

    fireEvent.blur(menu);
    expect(popover?.style?.display).toBe("none");
    expect(querySelector(".c-menu-item--focus")).toBeFalsy();
  });
});
describe("Menu vertical", () => {
  const MENU = (
    <Menu mode="vertical" width="300px" expandedIndex={["3-2"]}>
      <MenuItem index={1}>一级导航 1</MenuItem>
      <SubMenu title={<React.Fragment>一级导航 2</React.Fragment>} index={2}>
        <MenuItem index={"2-1"}>二级导航 1</MenuItem>
        <MenuItem index={"2-2"}>二级导航 2</MenuItem>
      </SubMenu>
      <SubMenu title={<React.Fragment>一级导航 3</React.Fragment>} index={3}>
        <MenuItem index={"3-1"}>二级导航 1</MenuItem>
        <SubMenu
          title={<React.Fragment>二级导航 2</React.Fragment>}
          index={"3-2"}
        >
          <MenuItem index={"3-2-1"}>三级导航 1</MenuItem>
          <MenuItem index={"3-2-2"}>三级导航 2</MenuItem>
          <SubMenu
            title={<React.Fragment>三级导航 3</React.Fragment>}
            index={"3-2-3"}
          >
            <MenuItem index={"3-2-3-1"}>四级导航 1</MenuItem>
            <SubMenu
              title={<React.Fragment>四级导航 2</React.Fragment>}
              index={"3-2-3-2"}
            >
              <MenuItem index={"3-2-3-2-1"}>五级导航 1</MenuItem>
              <MenuItemGroup title="分组">
                <MenuItem index={"3-2-3-2-2"}>五级导航 2</MenuItem>
                <MenuItem index={"3-2-3-2-3"}>五级导航 3</MenuItem>
              </MenuItemGroup>
            </SubMenu>
          </SubMenu>
          <SubMenu
            title={<React.Fragment>三级导航 4</React.Fragment>}
            index={"3-2-31"}
          >
            <MenuItem index={"3-2-3-11"}>四级导航 1</MenuItem>
          </SubMenu>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
  test("vertical menu structure", () => {
    render(MENU);

    const menu = querySelector(".c-menu") as HTMLElement;
    expect(menu.style.width).toBe("300px");

    const expandedMenu = querySelectorAll("[aria-expanded=true]");
    expect(expandedMenu).toHaveLength(2);

    const arrow = expandedMenu[1].querySelector(".c-menu-arrow") as HTMLElement;
    fireEvent.click(arrow);
    expect(querySelectorAll("[aria-expanded=true]")).toHaveLength(1);
    fireEvent.click(arrow);
    expect(querySelectorAll("[aria-expanded=true]")).toHaveLength(2);

    const group = querySelector(".c-menu-item-group__title") as HTMLElement;
    expect(group.style.paddingLeft).toBe("120px");
  });
  test("vertical menu keyboard event", () => {
    render(MENU);

    const menu = querySelector(".c-menu") as HTMLElement;
    fireEvent.mouseDown(menu);
    expect(getFocusHTML()).toBe(undefined);
    fireEvent.mouseUp(menu);

    fireEvent.focus(menu);
    expect(getFocusHTML()).toBe("一级导航 1");

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toContain("一级导航 2");

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toContain("一级导航 3");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toBe("二级导航 1");
    fireEvent.keyDown(menu, { key: "ArrowLeft" });
    expect(getFocusHTML()).toContain("一级导航 3");
    fireEvent.keyDown(menu, { key: "ArrowLeft" });
    expect(querySelectorAll("[aria-expanded=true]")).toHaveLength(1);
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toContain("一级导航 3");
    fireEvent.keyDown(menu, { key: "ArrowRight" });
    expect(querySelectorAll("[aria-expanded=true]")).toHaveLength(2);
    fireEvent.keyDown(menu, { key: "Enter" });
    expect(querySelectorAll("[aria-expanded=true]")).toHaveLength(1);
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    fireEvent.keyDown(menu, { key: "Enter" });
    expect(getFocusHTML()).toContain("一级导航 2");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toContain("二级导航 1");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "Enter" });
    expect(querySelectorAll("[aria-expanded=true]")).toHaveLength(3);
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toContain("二级导航 1");
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(getFocusHTML()).toContain("二级导航 2");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toContain("一级导航 3");

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toBe("二级导航 1");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "Enter" });
    expect(getFocusHTML()).toContain("二级导航 2");
    fireEvent.keyDown(menu, { key: "Enter" });
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(getFocusHTML()).toContain("三级导航 4");
    fireEvent.keyDown(menu, { key: "ArrowRight" });
    fireEvent.keyDown(menu, { key: "ArrowRight" });
    expect(getFocusHTML()).toContain("四级导航 1");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "Escape" });
  });
});
