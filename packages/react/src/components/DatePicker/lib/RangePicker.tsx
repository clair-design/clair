import { range } from "ramda";
import classnames from "classnames";
import { isValid, compareAsc } from "date-fns";
import React, {
  useState,
  useRef,
  useEffect,
  Ref,
  forwardRef,
  useCallback,
  MouseEvent
} from "react";

import { IconCalendar, IconClear } from "@components/Icon";
import { TooltipCore } from "@components/Tooltip/lib/TooltipCore";

import { rangePickerProps } from "./props";
import { isSameRange } from "./utils/date";
import { getPanelComponent } from "./panels";
import { RANGE_PANEL_COUNT, PREFIX } from "./constants";
import { PickerContext } from "./PickerContext";
import { useFocusable } from "./hooks/useFocusable";
import { usePickerContext } from "./hooks/usePickerContext";
import { parseRangeValue, parseRangeInputValue } from "./utils/parser";
import { formatRangeForDisplay, formatRangeValue } from "./utils/formatter";
import { RangePickerProps, RangeValue, FocusableHandles } from "./interface";
import {
  runMatchedCallback,
  getNextMode,
  getRangePlaceholder
} from "./utils/ui";

const RangePicker = (props: RangePickerProps, ref: Ref<FocusableHandles>) => {
  const {
    type = "date",
    value,
    style,
    format,
    className,
    disabled,
    readonly,
    defaultValue = [],
    size = "normal",
    clearable = true,
    shortcut,
    onChange,
    placeholder,
    onFocus,
    onBlur,
    firstDayOfWeek: weekStartsOn,
    ...rest
  } = props;

  // ======================== States ========================

  // the value user picked, a Date object
  const [parsedValue, setParsedValue] = useState<RangeValue>(
    parseRangeValue(value || defaultValue, type)
  );

  // the text displayed in the text field
  const [inputValue, setInputValue] = useState<string[]>(
    formatRangeForDisplay(parsedValue, type, { format, weekStartsOn })
  );

  // start date on the panel
  const [startValue, setStartValue] = useState<Date | null>(parsedValue[0]);

  // has user picked start date and not picked end date?
  const [isPickingEndDate, setIsPickingEndDate] = useState<boolean>(false);

  // user hovering on end date
  const [hoverValue, setHoverValue] = useState<Date | null>(null);

  // reference to the input field
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  // is first render
  const isFirstRenderRef = useRef<boolean>(true);

  // format range and set it as input's value
  const setInputValueToDate = useCallback(
    (range: RangeValue) => {
      const rangeStr = formatRangeForDisplay(range, type, {
        format,
        weekStartsOn
      });
      setInputValue(rangeStr);
    },
    [type, format, weekStartsOn]
  );

  // make the component focusable
  useFocusable(ref, startInputRef);

  // common picker states
  const pickerContext = usePickerContext(props, parsedValue[0]);
  Object.assign(pickerContext, {
    isRange: true,
    rangeValue: parsedValue,
    startValue,
    hoverValue,
    isPickingEndDate,
    setHoverValue
  });
  const {
    panelId,
    mode,
    setMode,
    isExpanded,
    setExpanded,
    isHovering,
    setViewDate,
    setHovering,
    setActiveCell,
    panelRef,
    showPanel,
    hidePanel,
    handleClickAway
  } = pickerContext;

  // reference to the picker container
  const pickerRef = useRef<HTMLDivElement>(null);

  // parse value on value change
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    setParsedValue(parseRangeValue(value || ["", ""], type));
    // close the picker panel after value changed from outside
    setExpanded(false);
  }, [setExpanded, type, value]);

  // reset viewDate and display after value change
  useEffect(() => {
    setViewDate(parsedValue[0] || new Date());
    setInputValueToDate(parsedValue);
  }, [parsedValue, setViewDate, setInputValueToDate]);

  // reset states after panel close
  useEffect(() => {
    setMode(type);
    setViewDate(parsedValue[0] || new Date());
    setInputValueToDate(parsedValue);
    setIsPickingEndDate(false);
    setHoverValue(null);
    setStartValue(null);
  }, [
    parsedValue,
    setMode,
    setViewDate,
    type,
    isExpanded,
    setInputValueToDate
  ]);

  // ======================== Interactions ========================
  // update the user picked value
  const updateValue = (value: RangeValue) => {
    if (isSameRange(value, parsedValue)) return;
    setParsedValue(value);
    onChange?.({
      target: { value: formatRangeValue(value, type, { weekStartsOn }) }
    });
    setInputValue(formatRangeForDisplay(value, type, { format, weekStartsOn }));
  };

  const clearValue = (e: MouseEvent) => {
    // avoid toggling panel's visibility
    e.stopPropagation();
    updateValue([null, null]);
    startInputRef.current?.focus();
  };

  const focusOnPanel = () => {
    panelRef.current?.querySelector<HTMLDivElement>("[role=grid]")?.focus();
  };

  // after user picked a value from panel
  const onValuePicked = (value: Date) => {
    // switch panel mode
    if (mode !== type) {
      setMode(getNextMode(type, mode));
      setViewDate(value);
      setActiveCell(null);
      setTimeout(focusOnPanel); // wait for panel rerender
      return;
    }

    // end value picked!
    if (isPickingEndDate) {
      setIsPickingEndDate(false);
      updateValue([startValue as Date, value].sort(compareAsc));
      hidePanel();
      endInputRef.current?.focus();
    } else {
      // just picked start value
      setIsPickingEndDate(true);
      setStartValue(value);
      setInputValueToDate([value, parsedValue[1]]);
    }
  };

  // toggle panel visibility
  const togglePanel = () => (isExpanded ? hidePanel() : showPanel());

  // apply input value
  const applyInputValue = () => {
    const newValue = parseRangeInputValue(inputValue, type, { format });
    const restoreOldValue = () => setInputValueToDate(parsedValue);
    newValue.every(isValid) ? updateValue(newValue) : restoreOldValue();
  };

  // on either of the two inputs blur
  const onInputBlur = (e: React.FocusEvent) => {
    const focusedElement = e.relatedTarget as HTMLElement;
    const isFocusInPicker = pickerRef.current?.contains(focusedElement);
    const isFocusInPanel = panelRef.current?.contains(focusedElement);

    // if focus is not on both of the inputs, then validate the input value
    if (!isFocusInPicker) {
      applyInputValue();
    }

    // if focused element is out of picker and panel, then hide the panel
    if (!isFocusInPicker && !isFocusInPanel) {
      hidePanel();
    }

    onBlur?.(e);
  };

  // on user input
  const setSingleInputValue = (index: number, value: string) => {
    const newValue = [...inputValue];
    newValue[index] = value;
    setInputValue(newValue);
  };

  const onEnterPressed = () => {
    togglePanel();
    applyInputValue();
  };

  // keyboard events on the text fields
  const onInputKeyDown = (event: React.KeyboardEvent) =>
    runMatchedCallback(
      event,
      ["Enter", onEnterPressed],
      ["Escape", hidePanel],
      ["ArrowUp ArrowDown", () => showPanel(true), true]
    );

  // ======================== Input ========================
  const inputClasses = classnames(
    "c-input",
    `c-input--${size}`,
    `${PREFIX}__input`
  );
  const sharedInputProps = {
    disabled,
    onFocus,
    type: "text",
    onBlur: onInputBlur,
    onClick: () => showPanel(),
    className: inputClasses,
    onKeyDown: onInputKeyDown
  };
  const placeholders = placeholder || getRangePlaceholder(type);
  const startInputElement = (
    <input
      ref={startInputRef}
      placeholder={placeholders[0]}
      value={inputValue[0]}
      onChange={e => setSingleInputValue(0, e.target.value)}
      {...sharedInputProps}
    />
  );
  const endInputElement = (
    <input
      ref={endInputRef}
      placeholder={placeholders[1]}
      value={inputValue[1]}
      onChange={e => setSingleInputValue(1, e.target.value)}
      {...sharedInputProps}
    />
  );

  // ======================== Icon ========================
  const isInteractive = !disabled && !readonly;
  const hasValue = parsedValue.length && parsedValue.every(Boolean);
  const shouldShowClearIcon =
    clearable && isInteractive && hasValue && isHovering;
  const clearIcon = () => (
    <IconClear role="button" aria-label="Clear" onClick={clearValue} />
  );
  const icon = shouldShowClearIcon ? clearIcon() : <IconCalendar />;

  // ======================== DatePicker ========================
  const classNames = classnames(
    className,
    PREFIX,
    `${PREFIX}--${size}`,
    `${PREFIX}-range`,
    {
      [`${PREFIX}--open`]: isExpanded,
      [`${PREFIX}--disabled`]: disabled
    }
  );
  const datePicker = (
    // eslint-disable-next-line
    <div
      ref={pickerRef}
      className={classNames}
      style={style}
      aria-haspopup={isInteractive}
      aria-expanded={isExpanded}
      aria-owns={panelId}
      onClick={() => showPanel()}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {startInputElement}
      <span className={`${PREFIX}-range__separator`}>-</span>
      {endInputElement}
      {icon}
    </div>
  );

  // ======================== Footer ========================
  const footer = shortcut ? (
    <div className={`${PREFIX}-popup__footer`}>{shortcut}</div>
  ) : null;

  // ======================== Panel ========================
  const PanelComponent = getPanelComponent(mode);
  const panelsSharedProps = {
    onClose: hidePanel,
    onChange: onValuePicked,
    ...rest
  };
  // show only one panel when mode switched
  const panelCount = mode === type ? RANGE_PANEL_COUNT : 1;
  const panel = (
    <div className="c-popover__container">
      <div className={`${PREFIX}-popup__content`} id={panelId}>
        <PickerContext.Provider value={pickerContext}>
          {range(0, panelCount).map(i => (
            <PanelComponent key={i} panelIndex={i} {...panelsSharedProps} />
          ))}
        </PickerContext.Provider>
      </div>
      {footer}
    </div>
  );

  // ======================== PopOver ========================
  const popoverClassNames = classnames(
    `${PREFIX}-popup`,
    `${PREFIX}-popup-range`,
    `${PREFIX}-popup--${size}`,
    "c-popover--no-triangle"
  );
  return (
    <TooltipCore
      ref={panelRef}
      content={panel}
      placement="bottom-left"
      trigger="click"
      visible={isExpanded}
      onVisibilityChange={handleClickAway}
      className={popoverClassNames}
    >
      {datePicker}
    </TooltipCore>
  );
};

const ForwardedComponent = forwardRef(RangePicker);

ForwardedComponent.propTypes = rangePickerProps;
ForwardedComponent.displayName = "RangePicker";

export { ForwardedComponent as RangePicker };
