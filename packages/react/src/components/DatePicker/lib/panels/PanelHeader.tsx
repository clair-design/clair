import React, { useContext, FC } from "react";
import { add, getDecade, endOfDecade } from "date-fns";

import { PanelHeaderProps } from "../interface";
import { PickerContext } from "../PickerContext";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight
} from "@components/Icon";

const PanelHeader: FC<PanelHeaderProps> = (props: PanelHeaderProps) => {
  const { type, viewDate, showIncrease = true, showDecrease = true } = props;
  const { setViewDate, setMode, setActiveCell } = useContext(PickerContext);

  const onYearChange = (isIncreasing: boolean) => {
    // eslint-disable-next-line no-magic-numbers
    const amount = (isIncreasing ? 1 : -1) * (type === "decade" ? 10 : 1);
    setViewDate((viewDate: Date) => add(viewDate, { years: amount }));
    setActiveCell(null);
  };

  const onMonthChange = (isIncreasing: boolean) => {
    const amount = isIncreasing ? 1 : -1;
    setViewDate((viewDate: Date) => add(viewDate, { months: amount }));
    setActiveCell(null);
  };

  const onNumberClick = (type: "month" | "year") => {
    setMode(type);
    setActiveCell(null);
  };

  const showYear = type !== "decade";
  const showMonth = type === "month";
  const showDecade = type === "decade";

  const previousYearLabel = showDecade ? "Previous Decade" : "Previous Year";
  const decreaseYearButton = showDecrease ? (
    <button aria-label={previousYearLabel} onClick={() => onYearChange(false)}>
      <IconDoubleArrowLeft aria-hidden="true" />
    </button>
  ) : null;

  const decreaseMonthButton =
    showDecrease && showMonth ? (
      <button aria-label="Previous Month" onClick={() => onMonthChange(false)}>
        <IconArrowLeft aria-hidden="true" />
      </button>
    ) : null;

  const nextYearLabel = showDecade ? "Next Decade" : "Next Year";
  const increaseYearButton = showIncrease ? (
    <button aria-label={nextYearLabel} onClick={() => onYearChange(true)}>
      <IconDoubleArrowRight aria-hidden="true" />
    </button>
  ) : null;

  const increaseMonthButton =
    showIncrease && showMonth ? (
      <button aria-label="Next Month" onClick={() => onMonthChange(true)}>
        <IconArrowRight aria-hidden="true" />
      </button>
    ) : null;

  const yearButton = showYear ? (
    <button onClick={() => onNumberClick("year")}>
      {viewDate.getFullYear()}年
    </button>
  ) : null;

  const monthButton = showMonth ? (
    <button onClick={() => onNumberClick("month")}>
      {viewDate.getMonth() + 1}月
    </button>
  ) : null;

  const decadeButton = showDecade && (
    <button>
      {getDecade(viewDate)}年 - {endOfDecade(viewDate).getFullYear()}年
    </button>
  );

  const onMouseDown = (e: React.MouseEvent) => e.preventDefault();

  return (
    // to fix the bug "click header close the panel"
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="c-date-picker-calendar__header" onMouseDown={onMouseDown}>
      {decreaseYearButton}
      {decreaseMonthButton}
      <div>
        {decadeButton}
        {yearButton}
        {monthButton}
      </div>
      {increaseMonthButton}
      {increaseYearButton}
    </div>
  );
};

PanelHeader.displayName = "PanelHeader";

export { PanelHeader };
