import React, { FC } from "react";
import { splitEvery, range, complement } from "ramda";
import { add, isSameYear, isThisYear, startOfDecade } from "date-fns";

import { isSameDecade } from "../utils/date";
import { BasePanel } from "./BasePanel";
import { SharedPanelProps, BasePanelOnlyProps } from "../interface";

const YearPanel: FC<SharedPanelProps> = (props: SharedPanelProps) => {
  const getYearGrid = (decade: Date) => {
    const numberOfYearsInRow = 3;
    const decadeStart = startOfDecade(decade);
    // eslint-disable-next-line no-magic-numbers
    const years = range(-1, 11).map(i => add(decadeStart, { years: i }));
    return splitEvery(numberOfYearsInRow, years);
  };

  const propsForBasePanel: BasePanelOnlyProps = {
    headerType: "decade",
    classIdentifier: "year",
    navigationMap: {
      left: { years: -1 },
      right: { years: 1 },
      up: { years: -3 },
      down: { years: 3 }
    },
    getGridData: getYearGrid,
    isValueInCalendar: isSameDecade,
    renderCellContent: (date: Date) => date.getFullYear(),
    isValueCurrent: isThisYear,
    isValueDimmed: complement(isSameDecade),
    isSameValue: isSameYear
  };

  return <BasePanel {...propsForBasePanel} {...props} />;
};

YearPanel.displayName = "YearPanel";

export { YearPanel };
