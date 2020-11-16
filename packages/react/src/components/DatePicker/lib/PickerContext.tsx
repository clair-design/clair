import { createContext, createRef } from "react";

import { PickerContextProps } from "./interface";

const nil = () => void 0;

export const PickerContext = createContext<PickerContextProps>({
  panelId: "",
  panelRef: createRef(),
  isExpanded: false,
  isHovering: false,
  setExpanded: nil,
  setHovering: nil,
  type: "date",
  mode: "date",
  viewDate: new Date(),
  isPanelFocused: false,
  firstDayOfWeek: 0,
  activeCell: null,
  setMode: nil,
  setViewDate: nil,
  setActiveCell: nil,
  setPanelFocus: nil,
  showPanel: nil,
  hidePanel: nil,
  handleClickAway: nil
});
