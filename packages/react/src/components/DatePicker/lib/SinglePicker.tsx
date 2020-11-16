import classnames from "classnames";
import { isValid, isSameDay } from "date-fns";
import React, {
  useState,
  useRef,
  useEffect,
  Ref,
  useCallback,
  forwardRef,
  MouseEvent
} from "react";

import { IconCalendar, IconClear } from "@components/Icon";
import { TooltipCore } from "@components/Tooltip/lib/TooltipCore";

import { PREFIX } from "./constants";
import { singlePickerProps } from "./props";
import { getPanelComponent } from "./panels";
import { PickerContext } from "./PickerContext";
import { useFocusable } from "./hooks/useFocusable";
import { usePickerContext } from "./hooks/usePickerContext";
import { parseValue, parseInputValue } from "./utils/parser";
import { formatValue, formatForDisplay } from "./utils/formatter";
import { SinglePickerProps, FocusableHandles } from "./interface";
import { runMatchedCallback, getNextMode, getPlaceholder } from "./utils/ui";

const SinglePicker = (props: SinglePickerProps, ref: Ref<FocusableHandles>) => {
  const {
    type = "date",
    className,
    style,
    format,
    disabled,
    readonly,
    value,
    defaultValue = "",
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
  const [parsedValue, setParsedValue] = useState<Date | null>(
    parseValue(value || defaultValue, type)
  );

  // the text displayed in the text field
  const [inputValue, setInputValue] = useState<string>(
    formatForDisplay(parsedValue, type, { format, weekStartsOn })
  );

  // reference to the input field
  const inputRef = useRef<HTMLInputElement>(null);

  // is first render?
  const isFirstRenderRef = useRef<boolean>(true);

  // make the component focusable
  useFocusable(ref, inputRef);

  // format date and set it as input's value
  const setInputValueToDate = useCallback(
    (value: Date | null) => {
      const dateStr = formatForDisplay(value, type, { format, weekStartsOn });
      setInputValue(dateStr);
    },
    [type, format, weekStartsOn]
  );

  // common picker states
  const pickerContext = usePickerContext(props, parsedValue);
  pickerContext.value = parsedValue;
  const {
    mode,
    setMode,
    panelId,
    isExpanded,
    setExpanded,
    isHovering,
    setHovering,
    setViewDate,
    setActiveCell,
    panelRef,
    showPanel,
    hidePanel,
    handleClickAway
  } = pickerContext;

  // parse value on value change
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    setParsedValue(parseValue(value || "", type));
    // close the picker panel after value changed from outside
    setExpanded(false);
  }, [setExpanded, type, value]);

  // reset viewDate and display value after parsed value change
  useEffect(() => {
    setViewDate(parsedValue || new Date());
    setInputValueToDate(parsedValue);
  }, [parsedValue, setViewDate, setInputValueToDate]);

  // reset mode and view date after panel close
  useEffect(() => {
    setViewDate(parsedValue || new Date());
    setMode(type);
  }, [parsedValue, setMode, setViewDate, type, isExpanded]);

  // ======================== Interactions ========================
  // update the user picked value
  const updateValue = (value: Date | null) => {
    if (isSameDay(value || 0, parsedValue || 0)) return;
    setParsedValue(value);
    onChange?.({
      target: { value: formatValue(value, type, { weekStartsOn }) }
    });
    setInputValueToDate(value);
  };

  const clearValue = (e: MouseEvent) => {
    // avoid toggling panel's visibility
    e.stopPropagation();
    updateValue(null);
    inputRef.current?.focus();
  };

  const focusOnPanel = () => {
    panelRef.current?.querySelector<HTMLDivElement>("[role=grid]")?.focus();
  };

  // after user picked a value from panel
  const onValuePicked = (value: Date) => {
    // check panel type
    if (mode !== type) {
      setMode(getNextMode(type, mode));
      setViewDate(value);
      setActiveCell(null);
      setTimeout(focusOnPanel); // wait for panel rerender
      return;
    }
    updateValue(value);
    hidePanel();
    inputRef.current?.focus();
  };

  // toggle panel visibility
  const togglePanel = () => (isExpanded ? hidePanel() : showPanel());

  // apply input value
  const applyInputValue = () => {
    const newValue = parseInputValue(inputValue, type, { format });
    const restoreOldValue = () => setInputValueToDate(parsedValue);
    isValid(newValue) ? updateValue(newValue) : restoreOldValue();
  };

  // after user typed in the text field, parse and validate it on blur
  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    applyInputValue();
    if (!panelRef.current?.contains(e.relatedTarget as HTMLElement)) {
      setExpanded(false);
    }
    onBlur?.(e);
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
  const placeholderText = placeholder || getPlaceholder(type);
  const inputClasses = classnames(
    "c-input",
    `c-input--${size}`,
    `${PREFIX}__input`
  );
  const inputElement = (
    <input
      type="text"
      ref={inputRef}
      placeholder={placeholderText}
      className={inputClasses}
      value={inputValue}
      disabled={disabled}
      onChange={e => setInputValue(e.target.value)}
      onFocus={onFocus}
      onBlur={onInputBlur}
      onClick={() => showPanel()}
      onKeyDown={onInputKeyDown}
    />
  );

  // ======================== Icon ========================
  const isInteractive = !disabled && !readonly;
  const shouldShowClearIcon =
    clearable && isInteractive && parsedValue && isHovering;
  const clearIcon = () => (
    <IconClear role="button" aria-label="Clear" onClick={clearValue} />
  );
  const icon = shouldShowClearIcon ? clearIcon() : <IconCalendar />;

  // ======================== DatePicker ========================
  const classNames = classnames(className, PREFIX, `${PREFIX}--${size}`, {
    [`${PREFIX}--open`]: isExpanded,
    [`${PREFIX}--disabled`]: disabled
  });
  const datePicker = (
    // eslint-disable-next-line
    <div
      className={classNames}
      style={style}
      aria-haspopup={isInteractive}
      aria-expanded={isExpanded}
      aria-owns={panelId}
      onClick={() => showPanel()}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {inputElement}
      {icon}
    </div>
  );

  // ======================== Footer ========================
  const footer = shortcut ? (
    <div className={`${PREFIX}-popup__footer`}>{shortcut}</div>
  ) : null;

  // ======================== Panel ========================
  const PanelComponent = getPanelComponent(mode);
  const panel = (
    <div className="c-popover__container">
      <div className={`${PREFIX}-popup__content`}>
        <PickerContext.Provider value={pickerContext}>
          <PanelComponent
            id={panelId}
            onChange={onValuePicked}
            onClose={hidePanel}
            {...rest}
          />
        </PickerContext.Provider>
      </div>
      {footer}
    </div>
  );

  // ======================== PopOver ========================
  const popoverClassNames = classnames(
    `${PREFIX}-popup`,
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

const DatePicker = forwardRef(SinglePicker);

DatePicker.propTypes = singlePickerProps;
DatePicker.displayName = "DatePicker";

export { DatePicker };
