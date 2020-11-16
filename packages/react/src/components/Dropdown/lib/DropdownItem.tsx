import React, { Component, MouseEvent, KeyboardEvent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DropdownMenuItemContext } from "./context";
import { DItemKey, KEY_CODE_VALUE, DropdownItemProps } from "./types";

export class DropdownItem extends Component<DropdownItemProps> {
  public static propTypes: PropTypes.InferProps<DropdownItemProps> = {
    disabled: PropTypes.bool,
    divided: PropTypes.bool,
    itemKey: DItemKey
  };
  public static displayName: "DropdownItem";
  public static contextType = DropdownMenuItemContext;
  private itemElm: HTMLLIElement | null = null;
  public focus = () => {
    // 选中当前DropdownItem
    this.itemElm?.focus({
      preventScroll: true
    });
  };
  private onItemClick = (event: MouseEvent<HTMLLIElement>) => {
    const { handleItemClick } = this.context;
    const { itemKey } = this.props;
    if (typeof handleItemClick === "function") {
      handleItemClick(event, itemKey);
    }
  };

  public componentDidUpdate = () => {
    // context内容更新时 存在副作用
    const { focusedIndex, index } = this.context;
    // 当前Item的序号与当前focus的下拉Item序号相等时，focus当前Item
    if (focusedIndex === index) {
      this.focus();
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    // 焦点在DropdownItem组件上时，按下回车和空格会发出一次点击事件
    const { key } = e;
    const { ENTER, SPACE } = KEY_CODE_VALUE;
    if (
      this.itemElm &&
      this.itemElm === document.activeElement &&
      (key === ENTER || key === SPACE)
    ) {
      e.preventDefault();
      this.itemElm.click();
    }
  };

  render(): React.ReactNode {
    const { children, divided, disabled } = this.props;
    return (
      <li
        className={classNames("c-dropdown-menu__item", {
          "c-dropdown-menu__item--divided": divided,
          "is-disabled": disabled
        })}
        aria-disabled={disabled}
        role="menuitem"
        tabIndex={-1}
        onClick={this.onItemClick}
        onKeyDown={this.handleKeyDown}
        ref={(r: HTMLLIElement) => (this.itemElm = r)}
      >
        {children}
      </li>
    );
  }
}
