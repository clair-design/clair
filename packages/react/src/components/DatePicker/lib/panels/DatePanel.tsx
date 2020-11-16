import React, { FC } from "react";
import { isToday, isSameDay, isSameMonth } from "date-fns";
import { complement } from "ramda";

import { getCalendarDays } from "../utils/date";
import { BasePanel } from "./BasePanel";
import { CalendarTitle } from "./CalendarTitle";
import { SharedPanelProps, BasePanelOnlyProps } from "../interface";

const DatePanel: FC<SharedPanelProps> = (props: SharedPanelProps) => {
  const propsForBasePanel: BasePanelOnlyProps = {
    headerType: "month",
    classIdentifier: "day",
    gridTitle: <CalendarTitle />,
    navigationMap: {
      left: { days: -1 },
      right: { days: 1 },
      up: { days: -7 },
      down: { days: 7 }
    },
    getGridData: getCalendarDays,
    isValueInCalendar: isSameMonth,
    renderCellContent: (date: Date) => date.getDate(),
    isValueCurrent: isToday,
    isValueDimmed: complement(isSameMonth),
    isSameValue: isSameDay
  };

  return <BasePanel {...propsForBasePanel} {...props} />;
};

DatePanel.displayName = "DatePanel";

export { DatePanel };
