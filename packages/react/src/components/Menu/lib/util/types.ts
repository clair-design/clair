import React from "react";
import PropTypes from "prop-types";

// ======================== menu ========================
const ModeType = ["horizontal", "vertical"] as const;
const ThemeType = ["light", "dark"] as const;

const IndexPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export type IndexType = string | number;
export type ArrayIndexType = Array<IndexType>;
export interface NormalizedNode {
  index: IndexType;
  path: IndexType[];
  children?: IndexType[];
  parent?: IndexType;
}
export type NodeMapType = Map<IndexType, NormalizedNode>;
export type NormalizeMenuFnType = (path: IndexType[]) => void;

export interface MenuContextType {
  activeNode?: NormalizedNode;
  focusedNode?: NormalizedNode;
  isVerticalAndNotCollapsed?: boolean;
  isCollapsed?: boolean;
  expandedIndexSet?: Set<IndexType>;
  addNodeToRoot?: NormalizeMenuFnType;
  removeNode?: (index: IndexType) => void;
  handleSelect?: (index: IndexType) => void;
  handleExpandChange?: (index: IndexType) => void;
}
export interface MenuProps {
  mode?: typeof ModeType[number];
  theme?: typeof ThemeType[number];
  width?: string;
  activeIndex?: IndexType;
  defaultActiveIndex?: IndexType;
  expandedIndex?: ArrayIndexType;
  collapsed?: boolean;
  onSelect?: (e: CCustomEvent<{ name: IndexType }>) => void;
}
export const MenuPropTypes = {
  mode: PropTypes.oneOf([...ModeType]),
  theme: PropTypes.oneOf([...ThemeType]),
  activeIndex: IndexPropType,
  defaultActiveIndex: IndexPropType,
  width: PropTypes.string,
  expandedIndex: PropTypes.array,
  collapsed: PropTypes.bool,
  onSelect: PropTypes.func
};

// ======================== submenu ========================
export interface SubMenuProps {
  index: IndexType;
  title?: React.ReactNode;
  disabled?: boolean;
}
export const SubMenuPropTypes = {
  index: IndexPropType.isRequired,
  title: PropTypes.node,
  disabled: PropTypes.bool
};
export interface SubMenuContextProps {
  level: number;
  addNodeToParent?: NormalizeMenuFnType;
}

// ======================== menu item ========================
export interface MenuItemProps {
  index: IndexType;
  disabled?: boolean;
}
export const MenuItemPropTypes = {
  index: IndexPropType.isRequired,
  disabled: PropTypes.bool
};

// ======================== menu group ========================
export interface MenuItemGroupProps {
  title?: React.ReactNode;
}
export const MenuItemGroupPropTypes = {
  title: PropTypes.node
};

// ======================== util ========================
export interface PaddingStyleType {
  paddingLeft?: string;
}

// ======================== MenuNodeMap ========================
export type KeyType =
  | "Enter"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight";

type FocusFnType = ({
  node,
  nodeMap,
  expandedIndexSet,
  isVerticalAndNotCollapsed
}: {
  node: NormalizedNode;
  nodeMap: NodeMapType;
  expandedIndexSet: Set<IndexType>;
  isVerticalAndNotCollapsed?: boolean;
}) => NormalizedNode | undefined;

export interface FocusHandlerType {
  Enter: FocusFnType;
  ArrowUp: FocusFnType;
  ArrowDown: FocusFnType;
  ArrowLeft: FocusFnType;
  ArrowRight: FocusFnType;
}

export type NodeHandlerType = (
  node: NormalizedNode,
  nodeMap: NodeMapType
) => NormalizedNode;
export type NodeArrayHandlerType = (
  node: NormalizedNode,
  nodeMap: NodeMapType
) => IndexType[];
// ======================== hooks ========================

export interface UseFocusEventProps {
  handleFocus: () => void;
  handleBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}
