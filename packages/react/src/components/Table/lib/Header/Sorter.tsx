import React, { useState } from "react";
import classnames from "classnames";
import { ORDER } from "../constants";
import { SortChangeType, DefaultSortType, OrderType } from "../types";

interface SorterPropTypes {
  column: string;
  defaultSort?: DefaultSortType;
  onSortChange?: SortChangeType;
}

const ALLOW_KEY_DOWN_CODE = ["Enter", " "];

function Sorter(props: SorterPropTypes): React.ReactElement {
  const { defaultSort = {}, column, onSortChange } = props;

  const defaultOrder = defaultSort.column === column ? defaultSort.order : "";

  const [order, setOrder] = useState<string | undefined>(defaultOrder);

  const toggleOrder = (orderType: OrderType) => {
    const newValue = order === orderType ? undefined : orderType;
    if (onSortChange) {
      onSortChange({
        detail: {
          column,
          order: newValue
        }
      });
    }
    setOrder(newValue);
  };

  /**
   * onKeyDown
   * 限制只有回车和空格才触发
   */
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    orderType: OrderType
  ) => {
    if (ALLOW_KEY_DOWN_CODE.includes(e.key)) {
      e.preventDefault(); // 阻止浏览器默认事件，如空格导致的窗口滚动
      toggleOrder(orderType);
    }
  };

  const sortClassNames = classnames({
    "c-table__sort": true,
    "c-table__sort--ascending": order === ORDER.ASCENDING,
    "c-table__sort--descending": order === ORDER.DESCENDING
  });
  return (
    <span className={sortClassNames}>
      <i
        className="c-table__sort--asc-icon"
        role="button"
        tabIndex={0}
        onKeyDown={e => onKeyDown(e, ORDER.ASCENDING)}
        onClick={() => toggleOrder(ORDER.ASCENDING)}
      />
      <i
        className="c-table__sort--desc-icon"
        role="button"
        tabIndex={0}
        onKeyDown={e => onKeyDown(e, ORDER.DESCENDING)}
        onClick={() => toggleOrder(ORDER.DESCENDING)}
      />
    </span>
  );
}

export default Sorter;
