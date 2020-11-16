import { COLUMN_FIXED_POSITION, COLUMN_TYPE } from "./constants";
import {
  ColumnsType,
  ExpandableType,
  SpanMethodType,
  FixedType,
  ColumnType
} from "./types";

export const getHasFixedColumn = <RecordType>(
  columns: ColumnsType<RecordType>
): boolean => {
  const isFixed = (column: ColumnType<RecordType>) =>
    column.fixed === COLUMN_FIXED_POSITION.LEFT ||
    column.fixed === COLUMN_FIXED_POSITION.RIGHT;
  return columns.some(isFixed);
};

export const getExpandable = <RecordType>(
  columns: ColumnsType<RecordType>
): ExpandableType => {
  let expandable = {};
  const expandColumn = columns.find(
    column => column.type === COLUMN_TYPE.EXPAND
  );
  if (expandColumn?.render) {
    expandable = {
      ...expandable,
      expandedRowRender: expandColumn.render
    };
  }
  return expandable;
};

export const getPropValue = (
  record: { [key: string]: React.Key },
  prop: string = ""
): React.Key => {
  return record[prop] || "";
};

export const getFixedOffset = (
  columns: ColumnsType,
  fixedPosition: FixedType
): number => {
  const result = columns
    .filter(item => item.fixed === fixedPosition)
    .map(item => item.width || 0);
  const fixedOffset = result.reduce((a, b) => a + b, 0);
  return fixedOffset;
};

export const getStickyOffsets = (columns: ColumnsType) => {
  const leftOffsets: number[] = [];
  const rightOffsets: number[] = [];
  let left = 0;
  let right = 0;

  const widths = columns.map(column => column.width);

  for (let start = 0; start < widths.length; start++) {
    // Left offset
    leftOffsets[start] = left;
    left += widths[start] || 0;

    // Right offset
    const end = widths.length - start - 1;
    rightOffsets[end] = right;
    right += widths[end] || 0;
  }
  return {
    left: leftOffsets,
    right: rightOffsets
  };
};

/**
 * full screen
 */
export const requestFullscreen = (target: any) => {
  if (target.requestFullscreen) {
    target.requestFullscreen();
  } else if (target.webkitRequestFullscreen) {
    target.webkitRequestFullscreen();
  } else if (target.mozRequestFullScreen) {
    target.mozRequestFullScreen();
  } else if (target.msRequestFullscreen) {
    target.msRequestFullscreen();
  }
};

export const getCellSpan = <RecordType>(
  spanMethod?: SpanMethodType,
  dataSource?: RecordType[],
  columns?: ColumnsType,
  dataSourceIndex?: number,
  columnIndex?: number
  // eslint-disable-next-line max-params
) => {
  const spans = {
    rowSpan: 1,
    colSpan: 1
  };

  if (typeof spanMethod === "function") {
    const getSpans = spanMethod(
      dataSource,
      columns,
      dataSourceIndex,
      columnIndex
    );
    if (getSpans) {
      spans.rowSpan = getSpans.rowSpan >= 0 ? getSpans.rowSpan : 1;
      spans.colSpan = getSpans.colSpan >= 0 ? getSpans.colSpan : 1;
    }
  }

  return spans;
};
