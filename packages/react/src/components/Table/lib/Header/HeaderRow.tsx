import React from "react";
import Cell from "../Cell";
import Sorter from "./Sorter";

import { COLUMN_TYPE } from "../constants";
import BodyContext from "../context/BodyContext";
import { SortChangeType, ColumnsType, DefaultSortType } from "../types";
import TableContext from "../context/TableContext";

export interface HeaderCellsProps {
  cells: ColumnsType;
  defaultSort?: DefaultSortType;
  onSortChange?: SortChangeType;
}

function HeaderRow(props: HeaderCellsProps) {
  const { cells, defaultSort, onSortChange } = props;

  const {
    stickyOffsets = {
      left: [],
      right: []
    }
  } = React.useContext(BodyContext);

  const { renderSelectAll } = React.useContext(TableContext);

  return (
    <tr>
      {cells.map((cell, index) => {
        const {
          prop,
          title,
          fixed,
          align,
          type,
          hidden,
          sortable,
          rowSpan,
          colSpan
        } = cell;
        if (hidden) {
          return null;
        }
        const fixedLeft = stickyOffsets.left[index];
        const fixedRight = stickyOffsets.right[index];
        let childNode = null;
        if (type === COLUMN_TYPE.SELECTION) {
          childNode = renderSelectAll();
        } else if (type === COLUMN_TYPE.EXPAND) {
          // 可展开
          childNode = null;
        } else if (typeof title === "function") {
          childNode = title();
        } else {
          childNode = title;
        }
        const CellComp = (
          <Cell
            key={prop}
            component="th"
            fixed={fixed}
            align={align}
            colSpan={colSpan}
            rowSpan={rowSpan}
            fixedLeft={fixedLeft}
            fixedRight={fixedRight}
          >
            {childNode}
            {sortable && (
              <Sorter
                column={prop}
                defaultSort={defaultSort}
                onSortChange={onSortChange}
              />
            )}
          </Cell>
        );
        return CellComp;
      })}
    </tr>
  );
}

export default HeaderRow;
