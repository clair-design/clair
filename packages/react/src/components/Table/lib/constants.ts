/** 表格大小 */
export const SIZE = {
  NORMAL: "normal",
  LARGE: "large",
  SMALL: "small"
} as const;

/** 选择状态，0 为选中；1 全选；2 部分选中 */
export const SELECTED = {
  NONE: 0,
  ALL: 1,
  INDETERMINATE: 2
} as const;

/** 列固定位置 */
export const COLUMN_FIXED_POSITION = {
  LEFT: "left",
  RIGHT: "right"
} as const;

/** 列类型 */
export const COLUMN_TYPE = {
  SELECTION: "selection",
  EXPAND: "expand"
} as const;

/** 排序 */
export const ORDER = {
  ASCENDING: "ascending",
  DESCENDING: "descending"
} as const;

/**
 * 单元格对齐方式
 */
export const ALIGN = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center"
} as const;
