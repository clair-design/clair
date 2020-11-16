import React from "react";

export interface TableContextProps {
  size: string;
  bordered: boolean;
  height?: number;
  // 渲染数据行的 checkbox
  renderRowSelection: Function;
  // 渲染数据列表的全选 checkbox
  renderSelectAll: Function;
  renderRowExpand: Function;
  leftShadowVisibility: boolean;
  rightShadowVisibility: boolean;
}

const TableContext = React.createContext<TableContextProps>({
  size: "normal",
  bordered: false,
  renderRowSelection: () => {
    return null;
  },
  renderSelectAll: () => {
    return null;
  },
  renderRowExpand: () => {
    return null;
  },
  leftShadowVisibility: false,
  rightShadowVisibility: false
});

export default TableContext;
