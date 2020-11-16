import React, {
  Component,
  ReactNode,
  Children,
  isValidElement,
  KeyboardEvent,
  MouseEvent
} from "react";
import PropTypes from "prop-types";
import { DropdownItem } from "./DropdownItem";
import { DropdownMenuContext, DropdownMenuItemContext } from "./context";
import {
  ItemKey,
  DropdownMenuProps,
  KEY_CODE_VALUE,
  DefaultDropdownMenuProps,
  DEFAULT_HIDEONCLICK
} from "./types";

export class DropdownMenu extends Component<DropdownMenuProps, {}> {
  public static propTypes: PropTypes.InferProps<DropdownMenuProps> = {
    onClick: PropTypes.func
  };
  public static displayName: "DropdownMenu";
  public static defaultProps: DefaultDropdownMenuProps = {
    hideOnClick: DEFAULT_HIDEONCLICK
  };
  public static contextType = DropdownMenuContext;

  private handleKeyDown = (e: KeyboardEvent): void => {
    const { key } = e;
    const { ARROW_DOWN, ARROW_UP, ESCAPE, HOME, END } = KEY_CODE_VALUE;
    const { focusedIndex, focusItem } = this.context;
    if ([ARROW_DOWN, ARROW_UP, ESCAPE, HOME, END].includes(key)) {
      e.preventDefault();
    }
    if (key === ARROW_DOWN || key === ARROW_UP) {
      if (typeof focusedIndex === "number") {
        // 当前有focus下拉Item时，focus下一个或上一个下拉Item
        if (key === ARROW_DOWN) {
          focusItem(focusedIndex + 1);
        } else if (key === ARROW_UP) {
          focusItem(focusedIndex - 1);
        }
      } else if (focusedIndex === null) {
        // 没有focus下拉Item时，focus第一个或最后一个下拉Item
        if (key === ARROW_DOWN) {
          focusItem(0);
        } else if (key === ARROW_UP) {
          focusItem(-1);
        }
      }
    } else if (key === ESCAPE) {
      // 按下escape，关闭DropdownMenu，并将焦点置于Dropdown按钮
      const { hideDropdownAndFocusTrigger } = this.context;
      hideDropdownAndFocusTrigger();
    } else if (key === HOME) {
      // 按下home，将焦点置于第一个DropdownItem
      focusItem(0);
    } else if (key === END) {
      // 按下end，将焦点置于最后一个DropdownItem
      focusItem(-1);
    }
  };

  render(): ReactNode {
    const { children, onClick, hideOnClick } = this.props;
    const {
      menuRef,
      hideDropdown,
      focusedIndex,
      menuStyle,
      menuPlacement
    } = this.context;
    const [dir1, dir2 = "center"] = menuPlacement.split("-");
    let itemIndex: number = 0;
    const childrenComp = Children.map(children, e => {
      if (!isValidElement(e)) {
        return null;
      }
      if (e.type !== DropdownItem) {
        return null;
      }
      if (e.props.disabled) {
        return e;
      }
      return (
        // 传递当前Item的序号，当前focus的下拉Item序号、以及点击事件
        <DropdownMenuItemContext.Provider
          value={{
            index: itemIndex++,
            focusedIndex,
            handleItemClick: (e: MouseEvent<HTMLLIElement>, key?: ItemKey) => {
              const detail: { key?: ItemKey } = {};
              if (typeof onClick === "function") {
                if (key || key === 0 || key === "") {
                  detail.key = key;
                }
                onClick({ detail, nativeEvent: e });
              }
              if (hideOnClick) {
                hideDropdown();
              }
            }
          }}
        >
          {e}
        </DropdownMenuItemContext.Provider>
      );
    });

    return (
      <menu
        className="c-dropdown-menu"
        role="menu" // eslint-disable-line
        x-placement={`${dir1}-${dir2}`}
        style={Object.assign({}, { position: "absolute" }, menuStyle)}
        ref={menuRef}
        tabIndex={-1}
        onKeyDown={this.handleKeyDown}
      >
        {childrenComp}
      </menu>
    );
  }
}
