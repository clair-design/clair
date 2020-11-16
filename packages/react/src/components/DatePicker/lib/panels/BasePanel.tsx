import classnames from "classnames";
import { range, unnest } from "ramda";
import { add, compareAsc } from "date-fns";
import React, { useEffect, useCallback, FC, useContext } from "react";

import { PanelHeader } from "./PanelHeader";
import { BasePanelProps } from "../interface";
import { RANGE_PANEL_COUNT, PREFIX } from "../constants";
import { PickerContext } from "../PickerContext";
import { isInRange, getViewDateOfIndex } from "../utils/date";
import { useGridNavigation } from "../hooks/useGridNavigation";

const BasePanel: FC<BasePanelProps> = (props: BasePanelProps) => {
  const pickerContext = useContext(PickerContext);
  const {
    id,
    gridTitle,
    classIdentifier,
    navigationMap,
    getGridData,
    isValueInCalendar,
    isValueCurrent,
    isValueDimmed,
    isSameValue,
    renderCellContent,
    additionalCellClass,
    headerType,
    onClose,
    onChange,
    panelIndex = 0
  } = props;

  const {
    type,
    mode,
    setViewDate,
    activeCell,
    hoverValue,
    setHoverValue,
    setActiveCell,
    firstDayOfWeek,
    shouldDisableCell,
    setCellClassName,
    isPanelFocused,
    isPickingEndDate,
    startValue,
    isRange = false,
    value = null,
    rangeValue = [null, null]
  } = pickerContext;

  // ======================== States ========================
  // offset viewDate by panelIndex
  const viewDate = getViewDateOfIndex(pickerContext.viewDate, panelIndex, type);

  // the displayed grid data
  const gridData = getGridData(viewDate, firstDayOfWeek);

  // ===================== Interactions =====================
  // a cell is clicked
  const onCellClick = (date: Date) => onChange?.(date);

  // a cell is hovered
  const onCellMouseEnter = (date: Date) =>
    isPickingEndDate && setHoverValue?.(date);

  // is value in the range calendars?
  const isValueInRangeCalendars = (value: Date, viewDate: Date) => {
    const panelCount = mode === type ? RANGE_PANEL_COUNT : 1;
    const allViewDates = range(0, panelCount).map(i => {
      return getViewDateOfIndex(viewDate, i, mode);
    });
    return allViewDates.some(viewDate => isValueInCalendar(value, viewDate));
  };

  // is value in calendar?
  const isInCalendar = isRange ? isValueInRangeCalendars : isValueInCalendar;

  // add the active date by specified duration
  const updateActiveCell = (duration: Duration) => {
    if (!activeCell) return;
    const newActiveCell = add(activeCell, duration);
    const direction = compareAsc(newActiveCell, activeCell);
    // if active date is not in the panels, switch to next calendar
    if (!isInCalendar(newActiveCell, pickerContext.viewDate)) {
      setViewDate(getViewDateOfIndex(pickerContext.viewDate, direction, mode));
    }
    setActiveCell(newActiveCell);
    onCellMouseEnter(newActiveCell);
  };

  // set default active cell
  const setDefaultActiveCell = useCallback(() => {
    let active = null;
    const today = new Date();
    const usedValue = isRange ? rangeValue[0] : value;
    if (usedValue && isValueInCalendar(usedValue, viewDate)) {
      active = usedValue;
    } else if (isValueInCalendar(today, viewDate)) {
      active = today;
    } else {
      // default to the first non-dimmed cell
      active = unnest(gridData).find(date => !isValueDimmed(date, viewDate));
    }
    setActiveCell(active || null);
  }, [
    value,
    isRange,
    viewDate,
    gridData,
    rangeValue,
    setActiveCell,
    isValueDimmed,
    isValueInCalendar
  ]);

  // keyboard navigation
  const gridRef = useGridNavigation({
    onLeftPressed: () => updateActiveCell(navigationMap.left),
    onRightPressed: () => updateActiveCell(navigationMap.right),
    onUpPressed: () => updateActiveCell(navigationMap.up),
    onDownPressed: () => updateActiveCell(navigationMap.down),
    onEnterPressed: () => onCellClick(activeCell as Date),
    onEscapePressed: () => onClose()
  });

  // only receive keyboard events on first panel
  const usedGridRef = panelIndex === 0 ? gridRef : null;

  // set active cell on panel get focus or viewDate changed
  useEffect(() => {
    if (panelIndex) return;
    if (isPanelFocused || type !== mode) {
      usedGridRef?.current
        ?.querySelector<HTMLDivElement>("[role=grid]")
        ?.focus();
    }
    if (!isPanelFocused) return setActiveCell(null);
    if (activeCell) return;
    setDefaultActiveCell();
  }, [
    type,
    mode,
    activeCell,
    panelIndex,
    usedGridRef,
    setActiveCell,
    isPanelFocused,
    setDefaultActiveCell
  ]);

  // ======================== Grid Cell ========================
  const renderCell = (cell: Date) => {
    const end = isPickingEndDate ? hoverValue : rangeValue?.[1];
    const start = isPickingEndDate ? startValue : rangeValue?.[0];

    const isSelected = isRange
      ? isSameValue(cell, start || 0) || isSameValue(cell, end || 0)
      : isSameValue(cell, value || 0);
    const isDisabled = shouldDisableCell?.(cell);
    const isDimmed = isValueDimmed(cell, viewDate);
    const isCellInRange =
      isRange && start && end && isInRange(cell, [start, end]);
    const prefix = `${PREFIX}__${classIdentifier}`;
    const className = classnames(
      {
        [`${prefix}--current`]: isValueCurrent(cell),
        [`${prefix}--active`]: isSameValue(cell, activeCell || 0) && !isDimmed,
        [`${prefix}--dimmed`]: isDimmed,
        [`${prefix}--selected`]: isSelected && !isDimmed,
        [`${prefix}--highlight`]: isCellInRange && !isDimmed
      },
      additionalCellClass?.(cell),
      setCellClassName?.(cell)
    );
    return (
      <button
        role="gridcell"
        key={cell.getTime()}
        className={className}
        aria-selected={isSelected}
        disabled={isDisabled}
        onClick={() => !isDisabled && onCellClick(cell)}
        onMouseEnter={() => onCellMouseEnter(cell)}
      >
        {renderCellContent(cell, viewDate)}
      </button>
    );
  };

  // ======================== Rows ========================
  const rows = gridData.map((row, i) => (
    <div role="row" key={i}>
      {row.map(renderCell)}
    </div>
  ));

  // ===================== Panel Header =====================
  const isLastPanel = panelIndex === RANGE_PANEL_COUNT - 1;
  const isFirstPanel = panelIndex === 0;
  const showIncrease = !isRange || type !== mode || isLastPanel;
  const showDecrease = !isRange || type !== mode || isFirstPanel;
  const propsForHeader = {
    type: headerType,
    viewDate,
    showIncrease,
    showDecrease
  };
  const panelHeader = <PanelHeader {...propsForHeader} />;

  // ======================== Grid ========================
  const prefix = `c-date-picker-calendar__${classIdentifier}s`;
  const gridClassName = classnames(prefix, props.gridClassName);
  const gridStyle = { outline: "none" };

  return (
    <div id={id} className="c-date-picker-calendar" ref={usedGridRef}>
      {panelHeader}
      <div role="grid" tabIndex={0} className={gridClassName} style={gridStyle}>
        {gridTitle}
        <div role="rowgroup" className={`${prefix}__body`}>
          {rows}
        </div>
      </div>
    </div>
  );
};

export { BasePanel };
