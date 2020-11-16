import React from "react";
import { ColumnsType, ExpandableType, DefaultRecordType } from "../types";
export interface BodyContext<RecordType = DefaultRecordType> {
  columns: ColumnsType<RecordType>;
  flattenColumns: ColumnsType<RecordType>;
  dataSource: RecordType[];
  rowKey: React.Key;
  selectedRowKeys?: React.Key[];
  stickyOffsets?: {
    left: number[];
    right: number[];
  };
  expandedRowKeys?: React.Key[];
  expandable?: ExpandableType;
}

const BodyContext = React.createContext<BodyContext>({
  columns: [],
  rowKey: "rowKey",
  flattenColumns: [],
  dataSource: []
});

export default BodyContext;
