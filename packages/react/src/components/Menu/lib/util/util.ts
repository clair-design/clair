import { isNil } from "@clair/helpers";
import { IndexType, PaddingStyleType, NormalizedNode } from "./types";

// 获取垂直导航每一子级的padding值
export const getPaddingByLevel = (level: number): PaddingStyleType => {
  const pad = 24;
  // 第一级对应的level为1, padding 为 24
  return {
    paddingLeft: `${level * pad}px`
  };
};

// 判断当前index是否在给定路径中, 用于判断active或focus状态
export function isIndexInNodePath(
  index: IndexType,
  currentNode?: NormalizedNode
): boolean {
  if (isNil(index) || !currentNode) return false;
  return currentNode.path?.includes(index);
}
