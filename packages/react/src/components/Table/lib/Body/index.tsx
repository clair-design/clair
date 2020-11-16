/**
 * Body Rows
 */
import React from "react";
import { Empty } from "@components/Empty";
import Cell from "../Cell";
import BodyRow from "./BodyRow";
import BodyContext from "../context/BodyContext";
import { EmptyTextType, RowClassNameType, SpanMethodType } from "../types";

interface BodyPropTypes {
  emptyText?: EmptyTextType;
  rowClassName?: RowClassNameType;
  spanMethod?: SpanMethodType;
}
// =========== Body Component ============
function Body(props: BodyPropTypes) {
  const { emptyText, rowClassName, spanMethod } = props;
  const { flattenColumns, dataSource, rowKey } = React.useContext(BodyContext);
  const columnsLen = flattenColumns.filter(item => !item.hidden).length;
  // When dataSource has no data，show Empty component.
  if (!dataSource || !dataSource.length) {
    return (
      <tbody>
        <tr className="c-table__row--empty">
          <Cell align="center" colSpan={columnsLen}>
            <Empty description={emptyText} />
          </Cell>
        </tr>
      </tbody>
    );
  }

  // 渲染 dataSource
  const rows = dataSource.map(
    (record, recordIndex): React.ReactElement => {
      const recordKey = rowKey && record[rowKey] ? record[rowKey] : recordIndex;
      return (
        <BodyRow
          key={recordKey}
          record={record}
          recordIndex={recordIndex}
          spanMethod={spanMethod}
          rowClassName={rowClassName}
        />
      );
    }
  );

  return <tbody>{rows}</tbody>;
}

export default Body;
