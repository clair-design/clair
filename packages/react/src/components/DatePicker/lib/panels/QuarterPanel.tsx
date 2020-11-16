import React, { FC } from "react";
import { range } from "ramda";
import {
  add,
  setMonth,
  isSameYear,
  isThisQuarter,
  isSameQuarter
} from "date-fns";

import { MONTHS } from "../constants";
import { BasePanel } from "./BasePanel";
import { SharedPanelProps, BasePanelOnlyProps } from "../interface";

const QuarterPanel: FC<SharedPanelProps> = (props: SharedPanelProps) => {
  // quarter cells data
  const numberOfMonthsInQuarter = 3;
  const getQuarterGrid = (viewDate: Date) => {
    const numberOfQuartersInYear = 4;
    const getQuarter = (q: number) =>
      setMonth(viewDate, q * numberOfMonthsInQuarter);
    return range(0, numberOfQuartersInYear).map(q => [getQuarter(q)]);
  };

  // render content of each quarter
  const renderQuarter = (quarter: Date) => {
    return range(0, numberOfMonthsInQuarter).map(i => {
      const month = add(quarter, { months: i }).getMonth();
      return <span key={month}>{MONTHS[month]}</span>;
    });
  };

  const propsForBasePanel: BasePanelOnlyProps = {
    headerType: "year",
    classIdentifier: "quarter",
    gridClassName: "c-date-picker-calendar__months",
    navigationMap: {
      left: { months: -3 },
      right: { months: 3 },
      up: { months: -3 },
      down: { months: 3 }
    },
    getGridData: getQuarterGrid,
    isValueInCalendar: isSameYear,
    renderCellContent: renderQuarter,
    isValueCurrent: isThisQuarter,
    isValueDimmed: () => false,
    isSameValue: isSameQuarter
  };

  return <BasePanel {...propsForBasePanel} {...props} />;
};

QuarterPanel.displayName = "QuarterPanel";

export { QuarterPanel };
