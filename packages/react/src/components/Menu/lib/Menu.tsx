import React, { useState, useEffect, createContext, useRef } from "react";
import { useMount } from "react-use/esm";
import classNames from "classnames";
import { isNil } from "@clair/helpers";
import {
  IndexType,
  NormalizedNode,
  NormalizeMenuFnType,
  MenuContextType,
  MenuProps,
  MenuPropTypes,
  KeyType
} from "./util/types";
import MenuNodeMap from "./util/menuNodeMap";
import { useFocusEvent } from "./hooks/useFocusEvent";

export const MenuContext = createContext<MenuContextType>({});

const keys = {
  ENTER: "Enter",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  ESC: "Escape"
};

export const Menu: React.FC<MenuProps> = props => {
  const {
    mode = "horizontal",
    activeIndex,
    defaultActiveIndex,
    expandedIndex = [],
    theme = "light",
    width,
    collapsed,
    onSelect,
    children
  } = props;

  const isControlled = !isNil(activeIndex);
  const isVertical = mode === "vertical";
  const isVerticalAndNotCollapsed = isVertical && !collapsed;

  // ======================== node structure ========================
  const { current: nodeMap } = useRef<MenuNodeMap>(
    /*@__PURE__*/ new MenuNodeMap()
  );

  const addNodeToRoot: NormalizeMenuFnType = path => {
    path.forEach((index, i) => {
      nodeMap.set({
        index,
        path: path.slice(0, i + 1),
        parent: path[i - 1],
        children: [path[i + 1]]
      });
    });
  };
  const removeNode = (index: IndexType) => {
    nodeMap.delete(index);
  };

  // ======================== active status ========================
  const [activeNode, setActiveNode] = useState<NormalizedNode>();
  const [focusedNode, setFocusedNode] = useState<NormalizedNode>();
  const defaultIndex = useRef<IndexType | undefined>(defaultActiveIndex);

  useEffect(() => {
    setActiveNode(
      nodeMap.get((activeIndex || defaultIndex.current) as IndexType)
    );
  }, [activeIndex, nodeMap]);

  const handleSelect = (index: IndexType): void => {
    onSelect?.({ detail: { name: index } });

    if (isControlled) return;

    const currentNode = nodeMap.get(index);
    setActiveNode(currentNode);
  };

  // ======================== submenu expand ========================
  const [expandedIndexSet, updateExpandedIndexSet] = useState(
    new Set(expandedIndex)
  );
  const handleExpandChange = (index: IndexType) => {
    updateExpandedIndexSet(prev => {
      const isExpanded = prev.has(index);
      const operation = isExpanded ? "delete" : "add";
      prev[operation]?.(index);
      return new Set(prev);
    });
  };

  useMount(() => {
    // 页面初始的时候, 若子项默认展开, 则向上递归将父项也放在set里
    expandedIndex.forEach(key => {
      const node = nodeMap.get(key);
      if (!node) return;
      const { path } = node;
      if (path.length) {
        path.forEach(item =>
          updateExpandedIndexSet(prev => {
            return new Set(prev.add(item));
          })
        );
      }
    });
  });

  // ======================== focus status ========================
  const handleFocus = () =>
    setFocusedNode(activeNode ?? nodeMap.getFirstNodeInMap());
  const handleBlur = () => setFocusedNode(undefined);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e;

    if (!Object.values(keys).includes(key)) return;
    e.preventDefault();

    if (key === keys.ESC) {
      handleBlur();
      return;
    }

    // 通过click等获取焦点后, 可能存在focusedNode为空的情况
    if (!focusedNode) {
      handleFocus();
      return;
    }

    const focusedNodeAfter = nodeMap.getFocusedNodeByKey({
      node: focusedNode,
      key: key as KeyType,
      expandedIndexSet,
      isVerticalAndNotCollapsed
    });
    if (!focusedNodeAfter) return;
    const { index } = focusedNodeAfter;
    const isExpanded = expandedIndexSet.has(index);

    if (key === keys.ENTER) {
      const isFocusMenuItem = !focusedNode?.children?.length;
      // 若为menuitem, 则选中
      if (isFocusMenuItem) {
        handleSelect(focusedNodeAfter.index);
        // 水平模式,选中后将focus节点置为空, 再次enter之后再将focusNode置为activeNode, 使得submenu可以展开
        if (!isVertical || collapsed) {
          setFocusedNode(undefined);
          return;
        }
      } else {
        // 折叠/展开 submenu
        handleExpandChange(index);
      }
    }
    setFocusedNode(focusedNodeAfter);

    // 针对垂直导航的键盘事件单独处理
    if (!isVerticalAndNotCollapsed) return;

    if (focusedNode?.index !== index) return;

    // 返回值为自身 & (左键 & 已展开 => 折叠) || (右键 & 已折叠 => 展开), 否则不做处理
    if (
      (key === keys.LEFT && isExpanded) ||
      (key === keys.RIGHT && !isExpanded)
    ) {
      handleExpandChange(index);
    }
  };

  // 每 render 一次都会执行一次是预期行为
  const menuRef = useFocusEvent({
    handleFocus,
    handleBlur,
    handleKeyDown
  });

  // ======================== element ========================
  const isCollapsed = isVertical && collapsed;
  const menuClass = classNames({
    "c-menu": true,
    "c-menu--dark": theme === "dark",
    "c-menu--collapsed": isCollapsed
  });

  return (
    <MenuContext.Provider
      value={{
        activeNode,
        focusedNode,
        handleExpandChange,
        handleSelect,
        addNodeToRoot,
        removeNode,
        isVerticalAndNotCollapsed,
        isCollapsed,
        expandedIndexSet
      }}
    >
      <div
        role="menu"
        className={menuClass}
        aria-orientation={mode}
        tabIndex={0}
        style={width && isVerticalAndNotCollapsed ? { width } : {}}
        ref={menuRef}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
};

Menu.propTypes = MenuPropTypes;
