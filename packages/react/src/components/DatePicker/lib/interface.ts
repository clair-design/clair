import { PICKER_TYPES, SIZES } from "./constants";
import {
  ReactNode,
  Dispatch,
  SetStateAction,
  CSSProperties,
  RefObject
} from "react";
import { TooltipCoreProps } from "@components/Tooltip/lib/types/tooltip";

// value types provided to date picker
export type RawDate = Date | string | number;

// value for range pickers
export type RangeValue = (Date | null)[];

// types of picker and panel
export type PickerType = typeof PICKER_TYPES[number];
export type PanelMode = PickerType;
export type PanelHeaderType = "month" | "year" | "decade";

// week and calendar
export type Week = [Date, Date, Date, Date, Date, Date, Date];
export type Calendar = [Week, Week, Week, Week, Week, Week];

// picker sizes
export type PickerSize = typeof SIZES[number];

// eslint-disable-next-line
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// eslint-disable-next-line
export type FirstWeekContainsDate = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// formatter and parser
export interface ParserOptions {
  format?: string;
  weekStartsOn?: WeekStartsOn;
  firstWeekContainsDate?: FirstWeekContainsDate;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}
export type FormatterOptions = ParserOptions;

// props for all kinds of picker
export interface BasePickerProps {
  type?: PickerType;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  size?: PickerSize;
  className?: string;
  style?: CSSProperties;
  format?: string;
  shortcut?: ReactNode;
  firstDayOfWeek?: WeekStartsOn;
  shouldDisableCell?: (date: Date) => boolean;
  setCellClassName?: (date: Date) => string;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

// props for single picker
export interface SinglePickerProps extends BasePickerProps {
  value?: RawDate;
  defaultValue?: RawDate;
  placeholder?: string;
  onChange?: (e: CFormEvent<string>) => void;
}

// props for range picker
export interface RangePickerProps extends BasePickerProps {
  value?: RawDate[];
  defaultValue?: RawDate[];
  placeholder?: string[];
  onChange?: (e: CFormEvent<string[]>) => void;
}

// states provided by the picker
export interface PickerContextProps {
  type: PickerType;
  mode: PanelMode;
  viewDate: Date;
  panelId: string;
  isPanelFocused: boolean;
  firstDayOfWeek: WeekStartsOn;
  activeCell: Date | null;
  isExpanded: boolean;
  isHovering: boolean;

  shouldDisableCell?: (date: Date) => boolean;
  setCellClassName?: (date: Date) => string;

  // setters
  setMode: Dispatch<SetStateAction<PanelMode>>;
  setViewDate: Dispatch<SetStateAction<Date>>;
  setActiveCell: Dispatch<SetStateAction<Date | null>>;
  setPanelFocus: Dispatch<SetStateAction<boolean>>;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  setHovering: Dispatch<SetStateAction<boolean>>;

  //refs
  panelRef: RefObject<HTMLDivElement>;

  // methods
  showPanel: (focusPanel?: boolean) => void;
  hidePanel: () => void;
  handleClickAway: TooltipCoreProps["onVisibilityChange"];

  // single picker
  value?: Date | null;

  // range related
  isRange?: boolean;
  rangeValue?: RangeValue;
  startValue?: Date | null;
  hoverValue?: Date | null;
  isPickingEndDate?: boolean;
  setHoverValue?: Dispatch<SetStateAction<Date>>;
}

// keyboard navigation config
type EventCallback = () => void;
export type KeyboardListeners = {
  onLeftPressed: EventCallback;
  onRightPressed: EventCallback;
  onUpPressed: EventCallback;
  onDownPressed: EventCallback;
  onEnterPressed: EventCallback;
  onEscapePressed: EventCallback;
};

// common props for ALL panels
export interface SharedPanelProps {
  id?: string;
  onClose: () => void;
  onChange: (date: Date) => void;

  // range related
  panelIndex?: number;
}

// props for the base panel
export interface BasePanelOnlyProps {
  classIdentifier: string;
  gridTitle?: ReactNode;
  gridClassName?: string;
  navigationMap: {
    left: Duration;
    right: Duration;
    up: Duration;
    down: Duration;
  };
  headerType: PanelHeaderType;

  getGridData: (viewDate: Date, firstDayOfWeek: WeekStartsOn) => Date[][];
  isValueInCalendar: (value: Date, viewDate: Date) => boolean;
  renderCellContent: (value: Date, viewDate: Date) => ReactNode;
  additionalCellClass?: (value: Date) => string;

  // is the value today or in this week/month/year
  isValueCurrent: (value: Date) => boolean;
  // is the value in current calendar should be dimmed
  isValueDimmed: (value: Date, viewDate: Date) => boolean;
  // is same day/week/month/year
  isSameValue: (a: Date | number, b: Date | number) => boolean;
}

export type BasePanelProps = BasePanelOnlyProps & SharedPanelProps;

export interface PanelHeaderProps {
  type: PanelHeaderType;
  // can't use viewDate form pickerContext because there may be multiple panels
  viewDate: Date;
  showIncrease?: boolean;
  showDecrease?: boolean;
}

export interface FocusableHandles {
  focus: () => void;
  blur: () => void;
}
