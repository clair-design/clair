import React, { FC, useContext } from "react";

import { PickerContext } from "../PickerContext";
import { WEEK_DAYS, NUMBER_OF_DAYS_IN_WEEK } from "../constants";

const CalendarTitle: FC = () => {
  const { firstDayOfWeek } = useContext(PickerContext);

  const weekDays = [...WEEK_DAYS, ...WEEK_DAYS].slice(
    firstDayOfWeek,
    firstDayOfWeek + NUMBER_OF_DAYS_IN_WEEK
  );
  const titles = weekDays.map(day => <span key={day}>{day}</span>);

  return (
    <div role="row" className="c-date-picker-calendar__weeks__header">
      {titles}
    </div>
  );
};

CalendarTitle.displayName = "CalendarTitle";

export { CalendarTitle };
