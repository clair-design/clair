/**
 * useSelection Hooks.
 */
import React from "react";
import { isEqual } from "lodash-es";
import Cell from "../Cell";
import { Checkbox } from "@components/Checkbox";
import {
  SelectRowType,
  SelectAllType,
  DataSourceType,
  FixedType,
  DefaultRecordType,
  DefaultSortType
} from "../types";
import { CheckboxEvent } from "@components/Checkbox/lib/types";
import { SELECTED } from "../constants";

export interface SelectionType {
  rowKey: React.Key;
  isControlled: boolean;
  selectedRowKeys?: React.Key[];
  dataSource: DataSourceType; // 当前页的 dataSource
  onSelectRow?: SelectRowType;
  onSelectAll?: SelectAllType;
}

export interface RenderSelectAllType {
  fixed?: FixedType;
}

export interface RenderRowSelectionType<RecordType = DefaultSortType> {
  key: React.Key;
  recordKey: React.Key;
  fixed: FixedType;
}

export type UseSelectionType = [React.Key[], Function, Function];

// export default
export function useSelection<RecordType extends DefaultRecordType>({
  rowKey,
  isControlled,
  selectedRowKeys = [],
  dataSource,
  onSelectRow,
  onSelectAll
}: SelectionType): UseSelectionType {
  const [selectedKeys, setSelectedKeys] = React.useState(selectedRowKeys);

  // effect
  React.useEffect(() => {
    // 在受控状态下，需要监听 selectedRowKeys 的变化，从而更新 checkbox UI
    if (!isEqual(selectedRowKeys, selectedKeys) && isControlled) {
      const keySet = new Set([...selectedRowKeys]);
      const newSelectedKeys = Array.from(keySet);
      setSelectedKeys(newSelectedKeys);
    }
  }, [isControlled, selectedKeys, selectedRowKeys]);

  // 获取全选状态
  const isSelectedAll = (): number => {
    let selectedAll: number = SELECTED.NONE;
    const matchRecord = dataSource.filter(data =>
      selectedKeys.includes(data[rowKey])
    );
    if (matchRecord.length === dataSource.length) {
      selectedAll = SELECTED.ALL; // 全选
    }
    if (matchRecord.length > 0 && matchRecord.length < dataSource.length) {
      selectedAll = SELECTED.INDETERMINATE;
    }

    return selectedAll;
  };

  // 触发 select all，同时会触发 onSelectAll API
  const onSelectAllChange = (selected: boolean) => {
    let recordKeys = [];
    if (selected) {
      const keys = dataSource.map(data => data[rowKey]);
      recordKeys = Array.from(new Set(keys));
    }
    if (typeof onSelectAll === "function") {
      onSelectAll(selected, recordKeys);
    }
    if (!isControlled) {
      setSelectedKeys(recordKeys);
    }
  };

  // 触发 checkbox onChange 同时会触发 onSelectRow API
  const onRowSelectionChange = (selected: boolean, recordKey: React.Key) => {
    // 更新 selectedKeys
    if (typeof onSelectRow === "function") {
      onSelectRow(recordKey, selected);
    }
    // 仅在非受控处理
    if (!isControlled) {
      const keySet = new Set(selectedKeys);
      if (selected) {
        keySet.add(recordKey);
      } else {
        keySet.delete(recordKey);
      }
      setSelectedKeys(Array.from(keySet));
    }
  };

  // ========= render checkbox cell ===================
  function renderRowSelection(
    props: RenderRowSelectionType<RecordType>
  ): React.ReactElement {
    const { key, recordKey, fixed } = props;
    const handleCheckboxChange = (event: CheckboxEvent): void => {
      const { target } = event;
      const { checked } = target;
      onRowSelectionChange(checked, recordKey);
    };
    const isSelected = selectedKeys.includes(recordKey);

    return (
      <Cell key={key} align="center" fixed={fixed}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </Cell>
    );
  }

  /**
   * renderSelectAll - 渲染列表头部全选 checkbox
   */
  function renderSelectAll() {
    const isSelectedAllState = isSelectedAll();
    const indeterminate = isSelectedAllState === SELECTED.INDETERMINATE;
    const checked: boolean = isSelectedAllState === SELECTED.ALL;

    const childNode = (
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={(event: CheckboxEvent) =>
          onSelectAllChange(event.target.checked)
        }
      />
    );
    return childNode;
  }

  return [selectedKeys, renderRowSelection, renderSelectAll];
}
