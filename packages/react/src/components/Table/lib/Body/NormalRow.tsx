/**
 * Rows tr
 */
import React from "react";
import Cell from "../Cell";

import BodyContext from "../context/BodyContext";

import { COLUMN_TYPE } from "../constants";
import { RowClassNameType, SpanMethodType, DefaultRecordType } from "../types";
import { getCellSpan } from "../utils";
import TableContext from "../context/TableContext";

// NormalRow 组件 Prop 类型定义
export interface NormalRowPropTypes<RecordType> {
  record: RecordType; // 当前渲染行
  recordIndex: number; // 当前渲染行索引
  rowClassName?: RowClassNameType; // 行 classname
  spanMethod?: SpanMethodType; // 合并单元格
}

// ================ Main Component ==========================
function NormalRow<RecordType extends DefaultRecordType>(
  props: NormalRowPropTypes<RecordType>
) {
  const { record, rowClassName, recordIndex, spanMethod } = props;
  let trClassNames = "";

  // context
  const { columns, dataSource, rowKey } = React.useContext(BodyContext);
  const { renderRowSelection, renderRowExpand } = React.useContext(
    TableContext
  );

  const recordKey = record[rowKey];

  if (typeof rowClassName === "function") {
    trClassNames = rowClassName(record, recordIndex);
  }
  // context
  const {
    flattenColumns,
    stickyOffsets = {
      left: [],
      right: []
    }
  } = React.useContext(BodyContext);

  const cells = flattenColumns.map((column, columnIndex) => {
    const { type, prop, render, fixed, hidden } = column;

    // 该列隐藏，不予渲染
    if (hidden) {
      return null;
    }

    const { rowSpan, colSpan } = getCellSpan(
      spanMethod,
      dataSource,
      columns,
      recordIndex,
      columnIndex
    );

    const value = record[prop];
    const cellValue = render
      ? render({ value, row: record, index: recordIndex })
      : value;

    const fixedLeftOffset = stickyOffsets.left[columnIndex]; // 标记固定列当前距离
    const fixedRightOffset = stickyOffsets.right[columnIndex];
    const cellKey = columnIndex;

    // 普通单元格
    let cell: React.ReactNode = (
      <Cell
        key={cellKey}
        fixed={fixed}
        rowSpan={rowSpan}
        colSpan={colSpan}
        fixedLeft={fixedLeftOffset}
        fixedRight={fixedRightOffset}
      >
        {cellValue}
      </Cell>
    );

    // 渲染多选按钮
    if (type === COLUMN_TYPE.SELECTION) {
      cell = renderRowSelection({ key: cellKey, fixed, recordKey });
    }

    // 渲染展开按钮
    if (type === COLUMN_TYPE.EXPAND) {
      cell = renderRowExpand({ record, recordKey, recordIndex, fixed });
    }
    return cell;
  });

  return <tr className={trClassNames}>{cells}</tr>;
}

export default NormalRow;
