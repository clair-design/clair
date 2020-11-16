import React, { FC } from "react";
import { splitEvery, range } from "ramda";
import { isSameMonth, setMonth, isThisMonth, isSameYear } from "date-fns";

import { MONTHS } from "../constants";
import { BasePanel } from "./BasePanel";
import { SharedPanelProps, BasePanelOnlyProps } from "../interface";

const MonthPanel: FC<SharedPanelProps> = (props: SharedPanelProps) => {
  const getMonthGrid = (viewDate: Date) => {
    const numberOfMonthsInQuarter = 3;
    const numberOfMonthsInYear = 12;
    const months = range(0, numberOfMonthsInYear).map(m =>
      setMonth(viewDate, m)
    );
    return splitEvery(numberOfMonthsInQuarter, months);
  };

  const propsForBasePanel: BasePanelOnlyProps = {
    headerType: "year",
    classIdentifier: "month",
    navigationMap: {
      left: { months: -1 },
      right: { months: 1 },
      up: { months: -3 },
      down: { months: 3 }
    },
    getGridData: getMonthGrid,
    isValueInCalendar: isSameYear,
    renderCellContent: (date: Date) => MONTHS[date.getMonth()],
    isValueCurrent: isThisMonth,
    isValueDimmed: () => false,
    isSameValue: isSameMonth
  };

  return <BasePanel {...propsForBasePanel} {...props} />;
};

MonthPanel.displayName = "MonthPanel";

export { MonthPanel };
