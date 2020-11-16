import { FC } from "react";
import { DatePanel } from "./DatePanel";
import { WeekPanel } from "./WeekPanel";
import { YearPanel } from "./YearPanel";
import { MonthPanel } from "./MonthPanel";
import { QuarterPanel } from "./QuarterPanel";
import { PickerType, SharedPanelProps } from "../interface";

const panels = new Map([
  ["week", WeekPanel],
  ["month", MonthPanel],
  ["quarter", QuarterPanel],
  ["year", YearPanel]
]);

export const getPanelComponent = (type: PickerType): FC<SharedPanelProps> => {
  return panels.get(type) || DatePanel;
};
