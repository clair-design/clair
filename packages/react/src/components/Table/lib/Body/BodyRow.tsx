/**
 * Body Rows
 */
import React from "react";
import NormalRow from "./NormalRow";
import Cell from "../Cell";
import BodyContext from "../context/BodyContext";
import { RowClassNameType, SpanMethodType, DefaultRecordType } from "../types";

export interface BodyRowProps<RecordType> {
  record: RecordType;
  recordIndex: number;
  key: React.Key;
  rowClassName?: RowClassNameType;
  spanMethod?: SpanMethodType;
}

function BodyRow<RecordType extends DefaultRecordType>(
  props: BodyRowProps<RecordType>
) {
  const { record, recordIndex, rowClassName, spanMethod } = props;
  const {
    flattenColumns,
    expandable,
    expandedRowKeys,
    rowKey
  } = React.useContext(BodyContext);
  const colSpan = flattenColumns.length;
  const recordKey = rowKey ? record[rowKey] : undefined;

  let normalRow: React.ReactNode;
  let expandedRow: React.ReactNode = null;

  // normal row render
  if (record) {
    normalRow = (
      <NormalRow
        key={recordIndex}
        record={record}
        recordIndex={recordIndex}
        rowClassName={rowClassName}
        spanMethod={spanMethod}
      />
    );
  }

  // expanded render
  const isExpanded = expandedRowKeys?.includes(recordKey);
  if (
    expandable &&
    typeof expandable.expandedRowRender === "function" &&
    isExpanded
  ) {
    expandedRow = (
      <tr>
        <Cell />
        <Cell component="td" colSpan={colSpan - 1}>
          {expandable.expandedRowRender({
            value: record[recordKey],
            row: record,
            index: recordIndex,
            isExpanded
          })}
        </Cell>
      </tr>
    );
  }

  return (
    <>
      {normalRow}
      {expandedRow}
    </>
  );
}

export default BodyRow;
