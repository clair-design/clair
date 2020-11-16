import React, { useContext, useEffect, useState, useRef } from "react";
import { useMount, useUnmount } from "react-use/esm";
import classNames from "classnames";
import { AutoIncreasingCounter } from "@clair/helpers";
import { MenuItemProps, MenuItemPropTypes } from "./util/types";
import { getPaddingByLevel, isIndexInNodePath } from "./util/util";
import { MenuContext } from "./Menu";
import { SubMenuContext } from "./SubMenu";

const counter = new AutoIncreasingCounter();

export const MenuItem: React.FC<MenuItemProps> = props => {
  const { disabled, index, children } = props;
  const {
    activeNode,
    focusedNode,
    handleSelect,
    addNodeToRoot,
    removeNode,
    isVerticalAndNotCollapsed
  } = useContext(MenuContext);
  const { addNodeToParent, level } = useContext(SubMenuContext);

  const [id] = useState(`c-menu-item-${counter.next()}`);
  const menuItemRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  // ======================== node ========================
  useMount(() => {
    if (disabled) return;
    (addNodeToParent ?? addNodeToRoot)?.([index]);
  });
  useUnmount(() => removeNode?.(index));

  // ======================== active status ========================
  const handleClick = () => {
    if (disabled) return;
    handleSelect?.(index);
  };

  useEffect(() => {
    setIsActive(isIndexInNodePath(index, activeNode));
  }, [activeNode, index]);

  // ======================== focus status ========================
  useEffect(() => {
    setIsFocus(isIndexInNodePath(index, focusedNode));
  }, [focusedNode, index]);

  // ======================== element ========================
  const itemClass: string = classNames({
    "c-menu-item": true,
    "c-menu-item--active": isActive,
    "c-menu-item--focus": isFocus
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      id={id}
      ref={menuItemRef}
      className={itemClass}
      role="menuitem"
      aria-disabled={disabled}
      tabIndex={-1}
      onClick={handleClick}
      style={isVerticalAndNotCollapsed ? getPaddingByLevel(level) : {}}
    >
      <div className="c-menu-item__inner">{children}</div>
    </div>
  );
};

MenuItem.propTypes = MenuItemPropTypes;
