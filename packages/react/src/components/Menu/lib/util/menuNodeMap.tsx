import { isNil } from "@clair/helpers";
import {
  IndexType,
  NormalizedNode,
  NodeMapType,
  KeyType,
  FocusHandlerType,
  NodeHandlerType,
  NodeArrayHandlerType
} from "./types";

// 判断节点是否为1级节点
const isRootNode = (node: NormalizedNode) => {
  return !node?.parent;
};
// 获取节点的父节点
const getParent: NodeHandlerType = (node, nodeMap) => {
  return nodeMap.get(node.parent as IndexType) as NormalizedNode;
};
// 获取节点的所有兄弟节点
const getSiblings: NodeArrayHandlerType = (node, nodeMap) => {
  return node.parent
    ? getParent(node, nodeMap)?.children ?? []
    : Array.from(nodeMap.values())
        .filter(item => !item.parent)
        .map(item => item.index);
};
// 获取节点的第一个子节点
const getFirstChildNode: NodeHandlerType = (node, nodeMap) => {
  return nodeMap.get(node.children?.[0] as IndexType) as NormalizedNode;
};
// 获取节点的上一个/下一个兄弟节点, 可能为空
const getSiblingNode = (
  node: NormalizedNode,
  nodeMap: NodeMapType,
  delta: number
) => {
  if (!node) return;

  const siblings = getSiblings(node, nodeMap);
  const currentIndexInParent = siblings.indexOf(node.index) as number;

  const siblingIndex = currentIndexInParent + delta;
  const siblingNode = nodeMap.get(siblings[siblingIndex]);
  return siblingNode;
};
// 获取节点的下一个节点, 若为当前为最后一个, 则递归获取parent的next
const getNextNodeInMap = (
  node: NormalizedNode,
  nodeMap: NodeMapType
): NormalizedNode | undefined => {
  if (!node) return;

  const siblingNext = getSiblingNode(node, nodeMap, 1);
  if (siblingNext) return siblingNext;

  const parent = getParent(node, nodeMap);
  return getNextNodeInMap(parent, nodeMap);
};
// 循环获取兄弟节点, 最后一个节点的next node为第一个节点
const getSiblingNodeCircularly = (
  node: NormalizedNode,
  nodeMap: NodeMapType,
  delta: number
) => {
  const siblings = getSiblings(node, nodeMap);
  const currentIndexInParent = siblings.indexOf(node.index) as number;

  let siblingIndex = currentIndexInParent + delta;

  if (siblingIndex < 0) {
    siblingIndex = siblings.length - 1;
  } else if (siblingIndex >= siblings.length) {
    siblingIndex = 0;
  }
  return nodeMap.get(siblings[siblingIndex]) as NormalizedNode;
};
// 判断节点是否为submenu
const isSubMenuNode = (node: NormalizedNode) => {
  return Boolean(node.children?.length);
};
// 判读节点是否expanded
const isExpanded = (node: NormalizedNode, expandedIndexSet: Set<IndexType>) => {
  return expandedIndexSet.has(node.index);
};
// 判断节点是否为submenu & expanded
const isSubmenuAndExpanded = (
  node: NormalizedNode,
  expandedIndexSet: Set<IndexType>
) => {
  return isSubMenuNode(node) && isExpanded(node, expandedIndexSet);
};
// 获取节点最后一个可视的子节点(包含展开的子项)
const getLastVisibleChild = (
  node: NormalizedNode,
  nodeMap: NodeMapType,
  expandedIndexSet: Set<IndexType>
): NormalizedNode => {
  // 递归获取最后一个 然后判断是否展开, 直到最后一个不含子节点(也可能为空的submenu)且不展开
  if (isSubmenuAndExpanded(node, expandedIndexSet)) {
    const lastChildIndex = node.children?.[
      node.children.length - 1
    ] as IndexType;
    if (!lastChildIndex) return node;
    const child = nodeMap.get(lastChildIndex);
    if (!child) return node;
    return getLastVisibleChild(child, nodeMap, expandedIndexSet);
  }
  return node;
};
// 水平导航的键盘事件
const horizontalHandler: FocusHandlerType = {
  Enter({ node, nodeMap }) {
    // 若node为submenu 则展开自身, 并focus到第一个子节点
    // 否则返回自身, 并选中
    return isSubMenuNode(node) ? getFirstChildNode(node, nodeMap) : node;
  },
  ArrowUp({ node, nodeMap }) {
    return getSiblingNodeCircularly(node, nodeMap, -1) as NormalizedNode;
  },
  ArrowDown({ node, nodeMap }) {
    return getSiblingNodeCircularly(node, nodeMap, 1) as NormalizedNode;
  },
  ArrowLeft({ node, nodeMap }) {
    if (!node.parent) {
      return getSiblingNodeCircularly(node, nodeMap, -1);
    }
    const parent = getParent(node, nodeMap);
    // 若父节点不为一级node, 则返回父节点
    // 若父节点为一级node, 则focus到父节点的prevNode
    return parent && isRootNode(parent)
      ? getSiblingNodeCircularly(parent, nodeMap, -1)
      : parent;
  },
  ArrowRight({ node, nodeMap, isVerticalAndNotCollapsed }) {
    // node为submenu, 且不为一级submenu(一级submenu返回nextNode) 返回第一个子节点
    // 或为垂直模式 & collapse & isSubmenu
    if ((node.parent || isVerticalAndNotCollapsed) && isSubMenuNode(node)) {
      return getFirstChildNode(node, nodeMap);
    }
    const [rootIndex] = node.path;
    const root = nodeMap.get(rootIndex) as NormalizedNode;
    return getSiblingNodeCircularly(root, nodeMap, 1);
  }
};
// 垂直导航的键盘事件
const verticalHandler: FocusHandlerType = {
  Enter({ node }) {
    return node;
  },
  ArrowUp({ node, nodeMap, expandedIndexSet }) {
    // 获取当前在parent中的index, 如果为第一个, 则回到parent
    // 否则获取上一个兄弟节点, 如果兄弟已展开, 则获取兄弟的最后一个子节点
    // 如果最后一个子节点也展开, 则递归取最后一个
    const siblings = getSiblings(node, nodeMap);
    const currentIndexInParent = siblings.indexOf(node.index) as number;
    const parent = getParent(node, nodeMap);

    if (currentIndexInParent === 0) {
      return parent;
    }
    const prevSibling = getSiblingNodeCircularly(node, nodeMap, -1);

    return getLastVisibleChild(prevSibling, nodeMap, expandedIndexSet);
  },
  ArrowDown({ node, nodeMap, expandedIndexSet }) {
    // 若为submenu 且已展开, 则返回第一个子节点
    if (isSubmenuAndExpanded(node, expandedIndexSet)) {
      return getFirstChildNode(node, nodeMap);
    }

    // 获取当前在parent中的index, 如果不是最后一个, 则返回nextSibling
    // 如果为最后一个, 则回到parent, 递归取 parent的next
    const siblings = getSiblings(node, nodeMap);
    const currentIndexInParent = siblings.indexOf(node.index) as number;
    const parent = getParent(node, nodeMap);

    if (
      parent &&
      currentIndexInParent === (parent?.children?.length as number) - 1
    ) {
      return getNextNodeInMap(parent, nodeMap);
    }
    return getSiblingNode(node, nodeMap, 1) as NormalizedNode;
  },
  ArrowLeft({ node, nodeMap, expandedIndexSet }) {
    // 若为submenu&已展开, 则返回自身, menu里折叠(返回自身)
    // 若未展开或不是submenu, 返回parent
    // 若无父级, 返回自身, 不进行任何操作
    const parent = getParent(node, nodeMap);
    return isSubmenuAndExpanded(node, expandedIndexSet) || !parent
      ? node
      : parent;
  },
  ArrowRight({ node, nodeMap, expandedIndexSet }) {
    // 如果是submenu 已展开, 则返回第一个子级, 未展开, 返回自己, 则展开
    // 若不是submenu, 则无操作, 即返回自身
    const child = getFirstChildNode(node, nodeMap);
    return isSubmenuAndExpanded(node, expandedIndexSet) ? child : node;
  }
};
export default class MenuNodeMap {
  nodeMap: NodeMapType;
  constructor() {
    this.nodeMap = new Map<IndexType, NormalizedNode>();
  }
  get(index: IndexType) {
    return isNil(index) ? undefined : this.nodeMap.get(index);
  }
  set({ index, path: currentPath, parent, children = [] }: NormalizedNode) {
    const [childIndex] = children;
    const originalChildrenArray = this.nodeMap.get(index)?.children ?? [];
    if (!(isNil(childIndex) || originalChildrenArray.includes(childIndex))) {
      originalChildrenArray.push(childIndex as IndexType);
    }
    this.nodeMap.set(index, {
      index,
      path: currentPath,
      parent,
      children: [...originalChildrenArray]
    });
  }
  delete(index: IndexType) {
    const node = this.nodeMap.get(index);
    if (node?.parent) {
      const parent = getParent(node, this.nodeMap);
      const currentIndexInParent = parent?.children?.indexOf(index) as number;
      if (currentIndexInParent >= 0) {
        parent?.children?.splice(currentIndexInParent, 1);
      }
    }

    this.nodeMap.delete(index);
  }
  // 获取第一个Node节点
  getFirstNodeInMap() {
    return Array.from(this.nodeMap)[0]?.[1];
  }
  // 获取键盘事件后要focus的节点
  getFocusedNodeByKey({
    key,
    isVerticalAndNotCollapsed,
    ...rest
  }: {
    node: NormalizedNode;
    key: KeyType;
    expandedIndexSet: Set<IndexType>;
    isVerticalAndNotCollapsed: boolean;
  }) {
    const handler = isVerticalAndNotCollapsed
      ? verticalHandler
      : horizontalHandler;

    return handler[key]?.({
      nodeMap: this.nodeMap,
      isVerticalAndNotCollapsed,
      ...rest
    });
  }
}
