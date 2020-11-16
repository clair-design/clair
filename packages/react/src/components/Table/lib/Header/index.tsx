import React, { forwardRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import HeaderRow from "./HeaderRow";
import {
  ColumnsType,
  SortChangeType,
  DefaultSortType,
  ColumnType
} from "../types";

import BodyContext from "../context/BodyContext";

interface CellType<RecordType> extends ColumnType<RecordType> {
  hasSubColumns?: boolean;
}

function parseHeaderRows<RecordType>(rootColumns: ColumnsType<RecordType>) {
  const rows: [CellType<RecordType>][] = []; // 多维数组
  function fillRowCells(
    columns: ColumnsType<RecordType>,
    rowIndex: number
  ): number[] {
    // Init rows
    rows[rowIndex] = rows[rowIndex] || [];

    const colSpans = columns.map(column => {
      const cell: CellType<RecordType> = {
        ...column
      };

      let colSpan: number = 1;
      const subColumns = column.children;
      if (subColumns?.length) {
        colSpan = fillRowCells(subColumns, rowIndex + 1).reduce(
          (total, count) => total + count,
          0
        );
        cell.hasSubColumns = true;
      }

      cell.colSpan = colSpan;
      rows[rowIndex].push(cell);
      return colSpan;
    });
    return colSpans;
  }

  fillRowCells(rootColumns, 0);
  const rowCount = rows.length;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach(cell => {
      if (!("rowSpan" in cell) && !cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex;
      }
    });
  }

  return rows;
}

interface HeaderPropTypes {
  hasFixedHeader: boolean;
  defaultSort?: DefaultSortType;
  onSortChange?: SortChangeType;
}

const Header = forwardRef<HTMLTableSectionElement, HeaderPropTypes>(
  (props, ref) => {
    const { onSortChange, hasFixedHeader, defaultSort } = props;
    const { columns = [] } = React.useContext(BodyContext);
    const cells = parseHeaderRows(columns);

    const theadClassNames = classnames({
      "c-table__thead--sticky": hasFixedHeader
    });
    return (
      <thead className={theadClassNames} ref={ref}>
        {cells.map((cell, index) => {
          return (
            <HeaderRow
              key={index}
              cells={cell}
              defaultSort={defaultSort}
              onSortChange={onSortChange}
            />
          );
        })}
      </thead>
    );
  }
);

Header.propTypes = {
  onSortChange: PropTypes.func,
  defaultSort: PropTypes.shape({
    column: PropTypes.string,
    order: PropTypes.oneOf(["ascending", "descending"])
  }),
  hasFixedHeader: PropTypes.bool.isRequired
} as PropTypes.ValidationMap<HeaderPropTypes>;

export default Header;
