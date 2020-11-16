/**
 * 展开/收起 hooks
 */
import React from "react";
import { isEqual } from "lodash-es";
import Cell from "../Cell";
import { IconCaretRight, IconCaretDown } from "@components/Icon";
import { FixedType, DefaultRecordType } from "../types";

export interface UseExpandPropsType {
  rowKey: React.Key;
  isControlled: boolean;
  expandedRowKeys?: React.Key[];
  onExpandRow?: Function;
}

// renderRowExpand param type
export interface RenderRowExpandType<RecordType> {
  record: RecordType;
  recordKey: React.Key;
  fixed: FixedType;
  recordIndex: number;
}

export type UseExpandType<RecordType> = [React.Key[], any];

export default function useExpand<RecordType>({
  rowKey,
  isControlled,
  expandedRowKeys = [],
  onExpandRow
}: UseExpandPropsType): UseExpandType<RecordType> {
  // 展开行 keys state
  const [expandedKeys, setExpandedKeys] = React.useState(expandedRowKeys);

  React.useEffect(() => {
    // 处理受控状态下的状态更新
    // 同时要判断是否想等，否则可能会出现重复渲染
    if (!isEqual(expandedRowKeys, expandedKeys) && isControlled) {
      const newKeys = Array.from(new Set(expandedRowKeys));
      setExpandedKeys(newKeys);
    }
  }, [expandedRowKeys, expandedKeys, isControlled]);

  // 更新展开行 keys
  const onExpandChange = (
    isExpanded: boolean,
    record: DefaultRecordType,
    recordIndex?: number
  ) => {
    if (typeof onExpandRow === "function") {
      onExpandRow({
        detail: {
          row: record,
          index: recordIndex,
          isExpanded
        }
      });
    }
    if (!isControlled) {
      const recordKey = record[rowKey];
      const keySet = new Set(expandedKeys);
      isExpanded ? keySet.add(recordKey) : keySet.delete(recordKey);
      const keys = Array.from(keySet);
      setExpandedKeys(keys);
    }
  };

  /**
   * renderRowExpand 渲染展开单元格
   */
  function renderRowExpand({
    record,
    recordKey,
    recordIndex,
    fixed
  }: RenderRowExpandType<RecordType>) {
    const expanded = expandedKeys.includes(recordKey);

    const ExpandIcon = expanded ? IconCaretDown : IconCaretRight;

    return (
      <Cell key={recordKey} align="center" fixed={fixed}>
        <ExpandIcon
          className="c-table__expand--arrow"
          onClick={() => onExpandChange(!expanded, record, recordIndex)}
        />
      </Cell>
    );
  }

  return [expandedKeys, renderRowExpand];
}
