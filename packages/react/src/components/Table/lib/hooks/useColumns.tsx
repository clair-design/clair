import React from "react";
import { ColumnsType } from "../types";
/**
 * 拍扁 columns 数组，主要用于处理表头分组的情况
 * 同时会对一些字段做处理，比如赋默认值等
 * @param columns 列配置
 */
function flatColumns<RecordType>(
  columns: ColumnsType<RecordType>
): ColumnsType<RecordType> {
  return columns.reduce((list, column) => {
    const { children } = column;
    if (children?.length) {
      // 递归执行，拍扁 columns
      return [
        ...list,
        ...flatColumns(children).map(childColum => ({
          ...childColum
        }))
      ];
    }
    // 直接返回
    return [
      ...list,
      {
        ...column
      }
    ];
  }, [] as ColumnsType<RecordType>);
}

function useColumns<RecordType>(
  columns: ColumnsType<RecordType>
): [ColumnsType<RecordType>] {
  const flattenColumns = React.useMemo(() => {
    return flatColumns(columns);
  }, [columns]);
  return [flattenColumns];
}

export default useColumns;
