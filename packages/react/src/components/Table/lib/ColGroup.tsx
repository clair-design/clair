import React from "react";
import { ColumnsType } from "./types";

import { COLUMN_TYPE } from "./constants";

interface ColGroupProps<RecordTye> {
  columns: ColumnsType<RecordTye>;
}

/** 展开列、可选列默认宽度 */
const defaultSelectionWidth = 50;
const defaultExpandWidth = 20;

function ColGroup<RecordTye>(props: ColGroupProps<RecordTye>) {
  const { columns } = props;

  const cols: React.ReactElement[] = columns.map((column, index) => {
    const { type } = column;
    let { width = "auto" } = column;
    if (type === COLUMN_TYPE.SELECTION && !width) {
      width = defaultSelectionWidth;
    }
    if (type === COLUMN_TYPE.EXPAND && !width) {
      width = defaultExpandWidth;
    }
    return <col key={index} style={{ width }} />;
  });

  return <colgroup>{cols}</colgroup>;
}

export default ColGroup;
