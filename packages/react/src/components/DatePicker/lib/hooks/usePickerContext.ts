import { useState, useRef } from "react";
import { AutoIncreasingCounter } from "@clair/helpers";

import { PREFIX } from "../constants";
import { BasePickerProps, PickerContextProps, PanelMode } from "../interface";
import { TooltipCoreProps } from "@components/Tooltip/lib/types/tooltip";

const counter = new AutoIncreasingCounter();

/**
 * React Context for providing picker states
 * @param props picker props
 * @param initViewDate initial value of viewDate
 */
export function usePickerContext(
  props: BasePickerProps,
  initViewDate: Date | null
) {
  const {
    type = "date",
    firstDayOfWeek = 0,
    shouldDisableCell,
    setCellClassName
  } = props;

  // ======================== States ========================

  // unique id for aria-owns
  const [panelId] = useState(`${PREFIX}-${counter.next()}`);

  // should the panel expanded?
  const [isExpanded, setExpanded] = useState(false);

  // is user hovering on the input field?
  const [isHovering, setHovering] = useState(false);

  // should the panel focused to enable keyboard navigation?
  const [isPanelFocused, setPanelFocus] = useState(false);

  // currently focused cell
  const [activeCell, setActiveCell] = useState<Date | null>(null);

  // current panel mode
  const [mode, setMode] = useState<PanelMode>(type);

  // current displayed calendar
  const [viewDate, setViewDate] = useState<Date>(initViewDate || new Date());

  // reference to the popover panel, used for click outside
  const panelRef = useRef<HTMLDivElement>(null);

  // display the picker panel
  const showPanel = (focusPanel?: boolean) => {
    if (focusPanel) setPanelFocus(true);
    !isExpanded && setExpanded(true);
  };

  // hide the picker panel
  const hidePanel = () => {
    if (!isExpanded) return;
    setExpanded(false);
    setPanelFocus(false);
    setActiveCell(null);
  };

  // hide panel when outside clicked
  // click on input-ish part shouldn't hide panel
  const handleClickAway: TooltipCoreProps["onVisibilityChange"] = ({
    detail: { visible, source }
  }) => {
    if (source !== "away") {
      return;
    }
    if (!visible) {
      hidePanel();
    }
  };

  const pickerContext: PickerContextProps = {
    panelId,
    type,
    mode,
    setMode,
    viewDate,
    setViewDate,
    activeCell,
    setActiveCell,
    isPanelFocused,
    setPanelFocus,
    isExpanded,
    setExpanded,
    isHovering,
    setHovering,
    firstDayOfWeek,
    shouldDisableCell,
    setCellClassName,
    panelRef,
    showPanel,
    hidePanel,
    handleClickAway
  };
  return pickerContext;
}
