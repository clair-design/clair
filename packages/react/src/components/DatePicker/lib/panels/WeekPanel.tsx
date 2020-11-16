import React, { FC } from "react";
import { complement, compose, take, map, range } from "ramda";
import { isSameMonth, isThisWeek, isSameWeek, add } from "date-fns";

import { BasePanel } from "./BasePanel";
import { CalendarTitle } from "./CalendarTitle";
import { getCalendarDays } from "../utils/date";
import { NUMBER_OF_DAYS_IN_WEEK } from "../constants";
import { SharedPanelProps, BasePanelOnlyProps } from "../interface";

const WeekPanel: FC<SharedPanelProps> = (props: SharedPanelProps) => {
  // generate seven days from first day
  const renderDate = (date: Date, viewDate: Date) => {
    const isDimmed = !isSameMonth(date, viewDate);
    const className = isDimmed ? "c-date-picker__day--dimmed" : "";
    return (
      <span key={date.getTime()} className={className}>
        {date.getDate()}
      </span>
    );
  };
  const renderCellContent = (firstDay: Date, viewDate: Date) => {
    return range(0, NUMBER_OF_DAYS_IN_WEEK).map(i => {
      const date = add(firstDay, { days: i });
      return renderDate(date, viewDate);
    });
  };

  const propsForBasePanel: BasePanelOnlyProps = {
    headerType: "month",
    classIdentifier: "week",
    gridTitle: <CalendarTitle />,
    navigationMap: {
      left: { days: -7 },
      right: { days: 7 },
      up: { days: -7 },
      down: { days: 7 }
    },
    getGridData: compose(map<Date[], Date[]>(take(1)), getCalendarDays),
    isValueInCalendar: isSameMonth,
    renderCellContent,
    additionalCellClass: () => "c-date-picker-week-row",
    isValueCurrent: isThisWeek,
    isValueDimmed: complement(isSameMonth),
    isSameValue: isSameWeek
  };

  return <BasePanel {...propsForBasePanel} {...props} />;
};

WeekPanel.displayName = "WeekPanel";

export { WeekPanel };
