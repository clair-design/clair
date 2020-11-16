import React, {
  useState,
  useRef,
  createContext,
  useContext,
  useEffect
} from "react";
import useUnmount from "react-use/esm/useUnmount";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { IconArrowDown } from "@components/Icon";
import { TooltipCore } from "@components/Tooltip/lib/TooltipCore";
import { TooltipCoreProps } from "@components/Tooltip/lib/types/tooltip";
import {
  NormalizeMenuFnType,
  SubMenuProps,
  SubMenuPropTypes,
  SubMenuContextProps
} from "./util/types";
import { getPaddingByLevel, isIndexInNodePath } from "./util/util";
import { MenuContext } from "./Menu";

export const SubMenuContext = createContext<SubMenuContextProps>({
  level: 1
});

export const SubMenu: React.FC<SubMenuProps> = props => {
  const {
    isCollapsed,
    activeNode,
    focusedNode,
    isVerticalAndNotCollapsed,
    expandedIndexSet,
    addNodeToRoot,
    removeNode,
    handleExpandChange
  } = useContext(MenuContext);
  const { addNodeToParent: extendsAddNodeToParent, level } = useContext(
    SubMenuContext
  );

  const { index, disabled, title, children } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // ======================== add node to parent ========================
  const addNodeToParent: NormalizeMenuFnType = path => {
    path.unshift(index);
    (extendsAddNodeToParent ?? addNodeToRoot)?.(path);
  };
  useUnmount(() => removeNode?.(index));

  // ======================== expand ========================
  const [isExpanded, setIsExpanded] = useState<boolean>(
    Boolean(expandedIndexSet?.has(index))
  );

  const handleClick = () => {
    if (!isVerticalAndNotCollapsed || disabled) return;
    handleExpandChange?.(index);
  };

  useEffect(() => {
    setIsExpanded(Boolean(expandedIndexSet?.has(index)));
  }, [expandedIndexSet, index]);

  // ======================== popover ========================
  const placement = level > 1 || isCollapsed ? "right-top" : "bottom";
  const onVisibilityChange: TooltipCoreProps["onVisibilityChange"] = param => {
    const {
      detail: { visible }
    } = param;
    setIsHovering(visible);
  };

  useEffect(() => {
    setIsOpened(Boolean(isVerticalAndNotCollapsed ? isExpanded : isHovering));
  }, [isVerticalAndNotCollapsed, isExpanded, isHovering, index]);

  // ======================== active status ========================
  useEffect(() => {
    if (!activeNode) return;

    const status = isIndexInNodePath(index, activeNode);
    setIsActive(status);
    // 选中后将hover的submenu折叠, vertical模式除外
    if (!isVerticalAndNotCollapsed) {
      setIsOpened(false);
    }
  }, [activeNode, index, isVerticalAndNotCollapsed]);

  // ======================== focus status ========================
  useEffect(() => {
    const status = isIndexInNodePath(index, focusedNode);
    const path = focusedNode?.path ?? [];
    const isCurrentFocus = index === path[path.length - 1];
    // 水平模式: 若子项有focus, 则展开, 若只有当前focus, 则关闭子项
    // 垂直模式的展开/折叠, 只通过expandedIndexSet控制isOpen
    if (!isVerticalAndNotCollapsed) {
      setIsOpened(status && !isCurrentFocus);
    }
    setIsFocus(isCurrentFocus);
    menuRef.current?.scrollIntoView?.({
      block: "nearest"
    });
  }, [focusedNode, index, isVerticalAndNotCollapsed]);

  // ======================== element ========================
  const menuTitleClass: string = classNames({
    "c-submenu__title": true,
    "c-submenu__title--hovered": isHovering,
    "c-submenu__title--active": isActive,
    "c-submenu__title--focus": isFocus
  });
  const arrowIconClass: string = classNames({
    "c-menu-arrow": true,
    "c-menu-arrow--expanded": isOpened
  });
  const titleElement = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={menuTitleClass}
      aria-disabled={disabled}
      style={isVerticalAndNotCollapsed ? getPaddingByLevel(level) : {}}
      role="menuitem"
      tabIndex={-1}
      onClick={handleClick}
    >
      <div className="c-menu-item__inner">
        {title}
        <IconArrowDown className={arrowIconClass} />
      </div>
    </div>
  );

  const dropdownClass: string = classNames({
    "c-submenu__dropdown": true,
    "c-submenu__dropdown--open": isOpened
  });
  const setHeightToZero = (element: HTMLElement) =>
    (element.style.maxHeight = "0");
  const setHeightToActual = (element: HTMLElement) =>
    (element.style.maxHeight = `${element.scrollHeight}px`);
  const setHeightToAuto = (element: HTMLElement) =>
    (element.style.maxHeight = "none");
  const dropDownElement = (
    <div className={dropdownClass} role="menu" tabIndex={-1}>
      <SubMenuContext.Provider
        value={{
          addNodeToParent,
          level: level + 1
        }}
      >
        {children}
      </SubMenuContext.Provider>
    </div>
  );

  const subMenuProps = {
    className: "c-submenu",
    role: "menuitem",
    ref: menuRef,
    tabIndex: -1,
    ["aria-haspopup"]: true,
    ["aria-expanded"]: isExpanded,
    ["aria-disabled"]: disabled
  };
  return isVerticalAndNotCollapsed ? (
    <div {...subMenuProps}>
      {titleElement}
      <CSSTransition
        in={isOpened}
        appear={true}
        timeout={500}
        onEnter={setHeightToZero}
        onEntering={setHeightToActual}
        onEntered={setHeightToAuto}
        onExit={setHeightToActual}
        onExiting={setHeightToZero}
      >
        {dropDownElement}
      </CSSTransition>
    </div>
  ) : (
    <TooltipCore
      trigger="hover"
      visible={isOpened}
      onVisibilityChange={onVisibilityChange}
      role="dialog"
      placement={placement}
      content={dropDownElement}
      appendTarget={menuRef.current as HTMLElement}
    >
      <div {...subMenuProps}>{titleElement}</div>
    </TooltipCore>
  );
};

SubMenu.propTypes = SubMenuPropTypes;
