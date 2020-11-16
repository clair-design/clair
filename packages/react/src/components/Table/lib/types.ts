import React from "react";
import { PaginationProps } from "@components/Pagination/lib/types";
import {
  SIZE,
  ORDER,
  ALIGN,
  COLUMN_TYPE,
  COLUMN_FIXED_POSITION
} from "./constants";
/** 取自 Pagination 组件 */
type ChangeEvent = CCustomEvent<{
  page: number;
  pageSize: number;
}>;

/** render 参数对象定义 */
export type DetailType<RecordType> = {
  value: React.Key;
  row?: RecordType;
  index?: number;
  isExpanded?: boolean; // 展开状态，在 type = expand 时候会携带该属性
};
/** dataSource prop type */
export type DataSourceType<RecordType = DefaultRecordType> = RecordType[];

/** fixed prop type */
export type FixedType = typeof COLUMN_FIXED_POSITION[keyof typeof COLUMN_FIXED_POSITION];

/** order prop type */
export type OrderType = typeof ORDER[keyof typeof ORDER];

/** align prop type */
export type AlignType = typeof ALIGN[keyof typeof ALIGN];

/** size prop type */
export type SizeType = typeof SIZE[keyof typeof SIZE];

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};
/** 用于当未传递 RecordType 的情况 */
export type DefaultRecordType = Record<string, any>;

/** Columns 列配置类型定义 */
export type ColumnsType<RecordType = DefaultRecordType> = ColumnType<
  RecordType
>[];

/** emptyText prop 类型定义 */
export type EmptyTextType = string | (() => React.ReactNode);

/** rowClassname prop 类型定义 */
export type RowClassNameType = (rowItem: object, rowIndex?: number) => string;

/** defaultSort prop 类型定义 */
export type DefaultSortType = {
  column?: string;
  order?: OrderType;
};

/** onSortChange回调参数类型定义 */
export type SortChangeEvent = {
  detail: { column: string; order?: OrderType };
};
/** onSortChange 回调函数类型定义 */
export type SortChangeType = (e: SortChangeEvent) => void;

/** onSelectAll 回调函数类型定义 */
export type SelectAllType = (selected: boolean, rowKeys?: string[]) => void;

/** onSelectRow 回调函数类型定义 */
export type SelectRowType = (
  currentRowKey: React.Key,
  selected?: boolean
) => void;
export type SpanMethodType = (
  rows?: {}[],
  columns?: ColumnsType,
  rowIndex?: number,
  columnIndex?: number
) => {
  rowSpan: number;
  colSpan: number;
};

// ExpandRowEvent 参数类型定义
export type ExpandRowEvent<RecordType = DefaultRecordType> = {
  detail: {
    row: RecordType;
    index: number;
    isExpanded: boolean;
  };
};
/** ExpandRowEvent prop 类型定义 */
export type ExpandRowType = (e: ExpandRowEvent) => void;

/**
 * 列配置
 */
export type ColumnRender<RecordType = DefaultRecordType> = (
  detail: DetailType<RecordType>
) => React.ReactNode;

export interface ColumnType<RecordType = DefaultRecordType> {
  prop: string;
  title: string | Function;
  children?: ColumnType[];
  width?: number;
  hidden?: boolean;
  sortable?: boolean;
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  fixed?: FixedType;
  type?: typeof COLUMN_TYPE[keyof typeof COLUMN_TYPE];
  align?: AlignType;
  render?: ColumnRender<RecordType>;
}
/** 该类型为 column.type = expand 处理后的类型 */
export interface ExpandableType {
  expandedRowRender?: ColumnRender;
  rowExpandable?: (record: {}, index: number) => boolean; // 用于控制当前渲染行是否可展开
}
/**
 * Table Props 类型定义
 */
export interface TableProps<RecordType = DefaultRecordType> {
  /** 列配置 */
  columns: ColumnsType<RecordType>;
  /** 数据源 */
  dataSource: DataSourceType<RecordType>;
  /** 表格行 key 的取值 */
  rowKey?: React.Key;
  /** 数据为空的时候展示内容 */
  emptyText?: EmptyTextType;
  /** 是否展示边框  */
  bordered?: boolean;
  /** 表格高度，设置了高度后会自动固定表头 */
  height?: number;
  /** 表格大小  */
  size?: SizeType;
  /** 默认排序配置  */
  defaultSort?: DefaultSortType;
  /** 行 className，返回一个 string */
  rowClassName?: RowClassNameType;
  /** 默认选中的数据行的 key 集合，当为受控状态时，会忽略该属性  */
  defaultSelectedRowKeys?: React.Key[];
  /** 默认展开的 key 集合  */
  defaultExpandedRowKeys?: React.Key[];
  /** 选中的表格行 key 集合，受控属性 */
  selectedRowKeys?: React.Key[];
  /** 展开的表格行 key 集合，受控属性 */
  expandedRowKeys?: React.Key[];
  /** 单元格合并 */
  spanMethod?: SpanMethodType;
  /** 页码配置 */
  pagination?: PaginationProps;
  /** 选择/取消选择某行的回调 */
  onSelectRow?: SelectRowType;
  /** 展开/收起某行的回调 */
  onExpandRow?: ExpandRowType;
  /** 选择/取消全选的回调 */
  onSelectAll?: SelectAllType;
  /** 点击排序时的回调 */
  onSortChange?: SortChangeType;
  /** 页码改变时的回调 */
  onPageChange?: (e: ChangeEvent) => any;
}

/** Table 对外提供的方法 */
export interface TableRefHandleTypes {
  fullScreen: Function;
}
