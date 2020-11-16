/**
 * Cell td
 */
import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import TableContext from "@components/Table/lib/context/TableContext";
import { getPropValue } from "./utils";
import { DefaultRecordType, FixedType, AlignType } from "./types";
import { ALIGN, COLUMN_FIXED_POSITION } from "./constants";
import { useContext } from "react";

interface CellPropTypes<RecordType = DefaultRecordType> {
  className?: string;
  record?: RecordType; // 数据对象
  prop?: string; // 数据字段
  fixed?: FixedType; // 是否固定列
  fixedRight?: number;
  fixedLeft?: number;
  children?: React.ReactNode;
  component?: "td" | "th"; // 组件类型
  colSpan?: number;
  rowSpan?: number;
  align?: AlignType;
}

function Cell(props: CellPropTypes) {
  const {
    className,
    record = {},
    prop,
    children,
    component: Component = "td",
    colSpan,
    rowSpan,
    fixed,
    fixedLeft = 0,
    fixedRight = 0,
    align = "left"
  } = props;
  const { leftShadowVisibility, rightShadowVisibility } = useContext(
    TableContext
  );
  if (colSpan === 0 || rowSpan === 0) {
    return null;
  }

  const childNode = children || getPropValue(record, prop);

  // 固定
  const fixedStyle: React.CSSProperties = {};

  if (fixed === COLUMN_FIXED_POSITION.LEFT) {
    fixedStyle.left = fixedLeft;
  }
  if (fixed === COLUMN_FIXED_POSITION.RIGHT) {
    fixedStyle.right = fixedRight;
  }

  const componentClassNames = classNames(className, {
    "c-table__text--center": align === ALIGN.CENTER,
    "c-table__cell--sticky":
      fixed &&
      [COLUMN_FIXED_POSITION.LEFT, COLUMN_FIXED_POSITION.RIGHT].includes(fixed),
    "c-table__cell--sticky-left":
      fixed === COLUMN_FIXED_POSITION.LEFT && leftShadowVisibility,
    "c-table__cell--sticky-right":
      fixed === COLUMN_FIXED_POSITION.RIGHT && rightShadowVisibility
  });
  return (
    <Component
      align={align}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={fixedStyle}
      className={componentClassNames}
    >
      {childNode}
    </Component>
  );
}

Cell.propTypes = {
  record: PropTypes.object,
  prop: PropTypes.string,
  fixed: PropTypes.oneOf(Object.values(COLUMN_FIXED_POSITION)),
  fixedRight: PropTypes.number,
  fixedLeft: PropTypes.number,
  children: PropTypes.node,
  component: PropTypes.oneOf(["td", "th"]),
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  align: PropTypes.oneOf(Object.values(ALIGN))
};

export default Cell;
