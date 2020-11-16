import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect
} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Header from "./Header";
import ColGroup from "./ColGroup";
import Body from "./Body";
import StickyShadow from "./StickyShadow";
import { Pagination } from "@components/Pagination";
import TableContext, { TableContextProps } from "./context/TableContext";
import BodyContext from "./context/BodyContext";
import useColumns from "./hooks/useColumns";
import {
  getHasFixedColumn,
  getExpandable,
  getStickyOffsets,
  requestFullscreen
} from "./utils";
import { TableProps, TableRefHandleTypes, DefaultSortType } from "./types";

import { SIZE, ORDER } from "./constants";
import {
  PaginationPropTypes,
  PaginationProps
} from "@components/Pagination/lib/types";
import { useSelection } from "./hooks/useSelection";
import useExpand from "./hooks/useExpand";

// =========== Main Component ===============
export const Table = forwardRef<TableRefHandleTypes, TableProps>(
  (props, ref) => {
    // props
    const {
      columns = [],
      dataSource = [],
      rowKey = "key",
      size = SIZE.NORMAL,
      bordered = false,
      height,
      emptyText,
      pagination,
      selectedRowKeys: propSelectedRowKeys,
      expandedRowKeys: propExpandedRowKeys,
      defaultSort,
      defaultSelectedRowKeys = [],
      defaultExpandedRowKeys = [],
      rowClassName,
      spanMethod,
      onSelectRow,
      onSelectAll,
      onSortChange,
      onPageChange,
      onExpandRow
    } = props;

    // refs
    const rootRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const theadRef = useRef<HTMLTableSectionElement>(null);

    /**
     * public method
     */
    useImperativeHandle(
      ref,
      (): TableRefHandleTypes => {
        return {
          fullScreen: () => {
            if (tableRef.current) {
              requestFullscreen(tableRef.current);
            }
          }
        };
      }
    );

    // selection hooks
    const isSelectionControlled = Boolean(propSelectedRowKeys);
    const [selectedRowKeys, renderRowSelection, renderSelectAll] = useSelection(
      {
        rowKey,
        dataSource,
        isControlled: isSelectionControlled,
        selectedRowKeys: isSelectionControlled
          ? propSelectedRowKeys
          : defaultSelectedRowKeys,
        onSelectRow,
        onSelectAll
      }
    );
    // expand hooks
    const isExpandControlled = Boolean(propExpandedRowKeys);
    const [expandedRowKeys, renderRowExpand] = useExpand({
      rowKey,
      isControlled: isExpandControlled,
      expandedRowKeys: isExpandControlled
        ? propExpandedRowKeys
        : defaultExpandedRowKeys,
      onExpandRow
    });

    // scroll
    const [hasPinLeft, setHasPinLeft] = React.useState<boolean>(false);
    const [hasPinRight, setHasPinRight] = React.useState<boolean>(false);
    const [hasPinTop, setHasPinTop] = React.useState<boolean>(false);

    const hasData = Boolean(dataSource.length);
    const hasFixedHeader = Boolean(hasData && height);
    const expandable = getExpandable(columns);
    const hasFixedColumn = getHasFixedColumn(columns);
    const [flattenColumns] = useColumns(columns);
    const stickyOffsets = getStickyOffsets(flattenColumns);
    // top shadow, place it below thead
    const [topOffset, setTopOffset] = React.useState(0);
    useEffect(() => {
      setTopOffset(theadRef.current?.offsetHeight ?? 0);
    }, []);
    /**
     * 滚动事件 - 用于监听表格滚动，控制是否显示固定列的阴影样式
     * @param {Object} currentTarget 当前滚动的目标
     * @param {Number} scrollLeft 滚动的距离
     */
    const handleScroll = ({ currentTarget }: React.UIEvent<HTMLDivElement>) => {
      if (currentTarget) {
        const {
          scrollWidth,
          clientWidth,
          scrollTop,
          scrollLeft
        } = currentTarget;
        setHasPinTop(scrollTop > 0);
        setHasPinLeft(scrollLeft > 0);
        setHasPinRight(scrollLeft < scrollWidth - clientWidth);
      }
    };
    // shadow detection after mount
    useEffect(() => {
      tableRef.current?.dispatchEvent(new Event("scroll"));
    }, []);

    // table context
    const TableContextValue: TableContextProps = React.useMemo(
      () => ({
        size,
        bordered,
        height,
        renderRowSelection,
        renderSelectAll,
        renderRowExpand,
        leftShadowVisibility: hasPinLeft,
        rightShadowVisibility: hasPinRight
      }),
      [
        size,
        bordered,
        height,
        renderRowSelection,
        renderSelectAll,
        renderRowExpand,
        hasPinLeft,
        hasPinRight
      ]
    );

    // body context
    const BodyContextValue = React.useMemo(
      () => ({
        columns,
        flattenColumns,
        dataSource,
        rowKey,
        stickyOffsets,
        expandable,
        expandedRowKeys,
        selectedRowKeys
      }),
      [
        columns,
        flattenColumns,
        dataSource,
        rowKey,
        stickyOffsets,
        expandable,
        expandedRowKeys,
        selectedRowKeys
      ]
    );

    // table content classnames
    const tableContentClassNames = classnames({
      "c-table--content": true,
      [`c-table--${size}`]: true,
      "c-table--bordered": bordered,
      "c-table--with-height": Boolean(height)
    });
    const tableClassNames = classnames({
      "c-table--fix": hasFixedColumn
    });
    // ================== render ===============
    return (
      <div className="c-table" ref={rootRef}>
        <div
          ref={tableRef}
          onScroll={handleScroll}
          className={tableContentClassNames}
          style={height ? { height } : undefined}
        >
          <TableContext.Provider value={TableContextValue}>
            <table className={tableClassNames}>
              <ColGroup columns={flattenColumns} />
              <BodyContext.Provider value={BodyContextValue}>
                <Header
                  ref={theadRef}
                  defaultSort={defaultSort}
                  hasFixedHeader={hasFixedHeader}
                  onSortChange={onSortChange}
                />
                <Body
                  emptyText={emptyText}
                  rowClassName={rowClassName}
                  spanMethod={spanMethod}
                />
              </BodyContext.Provider>
            </table>
          </TableContext.Provider>
        </div>
        {hasPinTop && <StickyShadow direction="top" offset={topOffset} />}
        {pagination && <Pagination onChange={onPageChange} {...pagination} />}
      </div>
    );
  }
);

Table.propTypes = {
  rowKey: PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  pagination: PropTypes.shape(
    PaginationPropTypes as PropTypes.ValidationMap<PaginationProps>
  ),
  height: PropTypes.number,
  size: PropTypes.oneOf([SIZE.LARGE, SIZE.NORMAL, SIZE.SMALL]),
  bordered: PropTypes.bool,
  emptyText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  defaultSort: PropTypes.shape({
    column: PropTypes.string,
    order: PropTypes.oneOf([ORDER.ASCENDING, ORDER.DESCENDING])
  } as PropTypes.ValidationMap<DefaultSortType>),
  expandedRowKeys: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  defaultSelectedRowKeys: PropTypes.array,
  defaultExpandedRowKeys: PropTypes.array,
  rowClassName: PropTypes.func,
  spanMethod: PropTypes.func,
  onSelectRow: PropTypes.func,
  onSelectAll: PropTypes.func,
  onExpandRow: PropTypes.func,
  onSortChange: PropTypes.func,
  onPageChange: PropTypes.func
};

Table.displayName = "Table";
