/* eslint-disable prefer-destructuring */
import { range, splitEvery, mathMod } from "ramda";
import {
  add,
  sub,
  startOfMonth,
  isSameDay,
  compareAsc,
  getDecade
} from "date-fns";
import { NUMBER_OF_DAYS_IN_WEEK } from "../constants";
import { WeekStartsOn, Calendar, RangeValue, PanelMode } from "../interface";

/**
 * get all days in a month calendar
 */
const getCalendarDays = (month: Date, weekStartsOn: WeekStartsOn): Calendar => {
  const numberOfDaysInCalendar = 42; // always show 6 weeks
  const firstDayOfTheMonth = startOfMonth(month);

  // first day in the calendar grid
  let calendarStartDay = sub(firstDayOfTheMonth, {
    days: mathMod(
      firstDayOfTheMonth.getDay() - weekStartsOn,
      NUMBER_OF_DAYS_IN_WEEK
    )
  });

  // if first day of a month is also first day of the week,
  // then make this week the second row in the calendar
  if (firstDayOfTheMonth.getDay() === weekStartsOn) {
    calendarStartDay = sub(calendarStartDay, { days: NUMBER_OF_DAYS_IN_WEEK });
  }

  // 42 days array
  const days = range(0, numberOfDaysInCalendar).map(days =>
    add(calendarStartDay, { days })
  );

  return splitEvery(NUMBER_OF_DAYS_IN_WEEK, days) as Calendar;
};

/**
 * is two ranges have same value
 */
const isSameRange = (range1: RangeValue, range2: RangeValue): boolean => {
  const [start1, end1] = range1;
  const [start2, end2] = range2;
  return isSameDay(start1 || 0, start2 || 0) && isSameDay(end1 || 0, end2 || 0);
};

/**
 * is the value in the given range (inclusive)
 */
const isInRange = (value: Date, range: [Date, Date]) => {
  const [start, end] = range.sort(compareAsc);
  const timeOfValue = value.getTime();
  return timeOfValue >= start.getTime() && timeOfValue <= end.getTime();
};

/**
 * get view date of the sibling panels
 */
const getViewDateOfIndex = (viewDate: Date, index: number, type: PanelMode) => {
  const yearsInDecade = 10;
  const map = new Map([
    ["date", { months: index }],
    ["week", { months: index }],
    ["month", { years: index }],
    ["quarter", { years: index }],
    ["year", { years: index * yearsInDecade }]
  ]);
  const duration = map.get(type);
  return duration ? add(viewDate, duration) : viewDate;
};

const isSameDecade = (a: Date, b: Date) => getDecade(a) === getDecade(b);

export {
  getCalendarDays,
  isSameRange,
  isInRange,
  getViewDateOfIndex,
  isSameDecade
};
