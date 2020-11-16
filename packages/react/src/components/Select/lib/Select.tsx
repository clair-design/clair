import React, {
  ChangeEvent,
  Children,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import classNames from "classnames";
import { throttle } from "lodash-es";
import { pipe } from "ramda";
import { IconArrowDown, IconClear } from "@components/Icon";
import { Tag } from "@components/Tag";
import PropTypes from "prop-types";
import { OptionProps } from "./Option";
import { TooltipCore } from "@components/Tooltip/lib/TooltipCore";
import {
  collectOptions,
  getLabel,
  filter as DEFAULT_FILTER,
  FilteredChild,
  filterOptions,
  findNextOrPrevActiveOption,
  flattenOptions,
  generateCustomEvent,
  generateFormEvent,
  getValue
} from "./helper";
import { DOM } from "@src/utils";
import SelectContext from "./SelectContext";
import { AutoIncreasingCounter } from "@clair/helpers";
import { useNonClickVisChange } from "./hooks/useNonClickVisChange";
import { useComboboxClick } from "./hooks/useComboClick";
import { FILTER_THROTTLE_TIME, HIDE_DELAY, KEYS, SHOW_DELAY } from "./constant";
import { PSize, SelectProps, sizes } from "@components/Select/lib/types";
import { Panel } from "@components/Select/lib/Panel";
import { useValue } from "@components/Select/lib/hooks/useValue";

const counter = /*@__PURE__*/ new AutoIncreasingCounter();

export const Select: React.FC<SelectProps> = props => {
  const {
    className,
    clearable = false,
    disabled = false,
    filterable = false,
    filter = DEFAULT_FILTER,
    multiple = false,
    loading = false,
    loadingText = "加载中…",
    size = "normal",
    value,
    filterThrottle = FILTER_THROTTLE_TIME,
    onBlur,
    onClear,
    onFocus,
    onSearch,
    async = false,
    onVisibilityChange,
    placeholder = "请选择…",
    style,
    children
  } = props;

  const inputClassName = classNames("c-input", className, {
    [`c-input--${size}`]: sizes.some(s => s === size)
  });

  const [isOpen, updateOpen] = useState<boolean>(false);
  const [isHovering, updateHovering] = useState<boolean>(false);
  const [isComposing, updateComposing] = useState<boolean>(false);
  const [filterText, updateFilterText] = useState<string>("");
  const [logicalValue, setLogicalValue] = useValue(props);
  const allOptions = flattenOptions(children);
  function isOptionChild(option: any): option is typeof allOptions[number] {
    return Boolean(option);
  }
  const selectedOptions = logicalValue
    .map(value => allOptions.find(option => option.props.value === value))
    .filter(isOptionChild);
  const selectedOptionProps = selectedOptions.map(option => option.props);
  // since `filter` is a function
  // it may vary on every render if it is created like `const filter = () => any`
  // therefore save it as a ref to avoid put it into deps of `useEffect`
  // which may cause infinite loop of update
  const filterRef = useRef(filter);
  filterRef.current = filter;
  const doFilterOptions: (
    ...args: Parameters<typeof collectOptions>
  ) => FilteredChild[] = useMemo(
    () =>
      pipe(
        collectOptions,
        filterOptions({ filter: filterRef, filterText, filterable })
      ),
    [filterText, filterable]
  );
  const [filteredChildren, updateFilteredChildren] = useState<
    Array<FilteredChild>
  >(doFilterOptions(children));
  const [filtering, updateFiltering] = useState<boolean>(false);
  const [activeOption, updateActiveOption] = useState<OptionProps | null>(null);
  const [triggerDom, updateTriggerDom] = useState<DOM>(null);
  const forwardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const showClear = clearable && logicalValue.length && isHovering;
  const showTags = multiple && logicalValue.length > 0;
  const canFilterInput = async || filterable;

  // default value from props change on every render
  const onFilter = throttle((filterText: string) => {
    if (async && onSearch) {
      return onSearch(generateCustomEvent({ query: filterText }));
    }
    // TODO: mark-sweep
    updateFilteredChildren(doFilterOptions(children));
  }, filterThrottle);

  const lastFilterTextRef = useRef(filterText);
  useEffect(() => {
    if (lastFilterTextRef.current !== filterText) {
      lastFilterTextRef.current = filterText;
      onFilter(filterText);
    }
  }, [filterText, onFilter]);

  const toggleDropdownVis = (visibility: boolean = !isOpen) => {
    if (disabled) return;
    updateOpen(visibility);
    updateFilterText("");
    canFilterInput && updateFiltering(visibility);
    onVisibilityChange?.(
      generateCustomEvent({
        visible: visibility
      })
    );
  };

  useEffect(() => {
    updateFilteredChildren(doFilterOptions(children));
  }, [children, doFilterOptions]);

  useEffect(() => {
    const focusInput = () => inputRef?.current?.focus?.();
    if (isOpen && canFilterInput) {
      focusInput();
    }
  }, [logicalValue, isOpen, canFilterInput]);

  // update value
  const onSingleChange = (optionProps: OptionProps) => {
    updateFiltering(false);
    toggleDropdownVis(false);
    setLogicalValue(optionProps.value);
  };
  const onMultipleChange = (optionProps: OptionProps) => {
    const optionIndex = selectedOptionProps.findIndex(
      optionPropsItem => optionPropsItem.value === optionProps.value
    );
    if (optionIndex > -1) {
      selectedOptionProps.splice(optionIndex, 1);
    } else {
      selectedOptionProps.push(optionProps);
    }
    setLogicalValue(selectedOptionProps.map(props => props.value));
  };
  const handleChange = (optionProps: OptionProps) => {
    if (optionProps.disabled) return;
    if (!multiple) {
      onSingleChange(optionProps);
    } else {
      onMultipleChange(optionProps);
    }
  };

  const clearValue = (e: MouseEvent | KeyboardEvent) => {
    setLogicalValue([]);
    e.stopPropagation();
    onClear?.(generateFormEvent(getValue([], multiple), e));
  };
  const handleDelete = (e: React.KeyboardEvent) => {
    if (filterText || !logicalValue.length) {
      return;
    }
    if (multiple) {
      const selected: Array<OptionProps> = selectedOptionProps;
      const lastValue = selected[selected.length - 1];
      handleChange(lastValue);
    } else if (clearable) {
      clearValue(e);
    }
  };

  const onClickVisChange = useComboboxClick(isOpen, toggleDropdownVis);
  const combEvents = {
    onFocus: (e: FocusEvent) => {
      if (!multiple) {
        const [val] = selectedOptionProps;
        updateActiveOption(val);
      } else {
        updateActiveOption(null);
      }
      return onFocus?.(
        generateFormEvent(value ?? getValue(selectedOptionProps, multiple), e)
      );
    },
    onBlur: (e: FocusEvent) => {
      return onBlur?.(
        generateFormEvent(value ?? getValue(selectedOptionProps, multiple), e)
      );
    },
    onKeyDown: (e: KeyboardEvent) => {
      const { key: code } = e;
      if (code === KEYS.DELETE) return handleDelete(e);
      if (code === KEYS.TAB) return toggleDropdownVis(false);
      if (code === KEYS.SPACE) {
        if (canFilterInput) return;
        return e.preventDefault();
      }
      const isCloseTrigger = KEYS.ESC === code;

      if (isCloseTrigger && isOpen) return toggleDropdownVis(false);
      if (Object.values(KEYS).includes(code)) e.preventDefault();
      const isOpenTrigger = [
        KEYS.SPACE,
        KEYS.ENTER,
        KEYS.UP,
        KEYS.DOWN
      ].includes(code);
      if (isOpenTrigger && !isOpen) return toggleDropdownVis(true);
      if (
        (code === KEYS.ENTER || code === KEYS.SPACE) &&
        activeOption &&
        isOpen &&
        !isComposing
      ) {
        return handleChange(activeOption);
      }
      if (isOpen && [KEYS.UP, KEYS.DOWN].includes(code)) {
        updateActiveOption(
          findNextOrPrevActiveOption({
            filteredChildren,
            activeOptionProps: activeOption,
            delta: code === KEYS.DOWN ? 1 : -1
          })
        );
      }
    },
    onCompositionStart: () => {
      updateComposing(true);
    },
    onCompositionEnd: () => {
      updateComposing(false);
    },
    onMouseEnter: () => updateHovering(true),
    onMouseLeave: () => updateHovering(false),
    onClick: onClickVisChange
  };

  const inputEvents = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      updateFilterText(target.value);
    }
  };

  const placeStyle = {
    width: triggerDom ? triggerDom.getBoundingClientRect().width : ""
  };

  const selectClassName = classNames("c-select", className, {
    [`c-select--${size}`]: sizes.some(s => s === size),
    "c-select--open": isOpen,
    "c-select--disabled": disabled
  });
  const { current: id } = useRef(`select-${counter.next()}`);
  const content = (
    <Panel
      loading={loading}
      loadingText={loadingText}
      filteredChildren={filteredChildren}
      hasChildren={Children.count(children) > 0}
    />
  );

  const [firstSelectedOption] = selectedOptionProps;
  const displayLabel = firstSelectedOption
    ? getLabel(firstSelectedOption)
    : null;
  let displayPlaceholder: string = placeholder;
  let displayValue: string = displayLabel ?? "";
  if (filtering) {
    displayPlaceholder = displayLabel ?? placeholder;
    displayValue = filterText;
  }

  const onNonClickVisChange = useNonClickVisChange(toggleDropdownVis);
  let textBox = (
    <input
      ref={inputRef}
      readOnly={!canFilterInput || !filtering}
      tabIndex={-1}
      {...inputEvents}
      className={inputClassName}
      value={displayValue}
      disabled={disabled}
      placeholder={displayPlaceholder}
    />
  );
  if (showTags) {
    const tags = selectedOptionProps.map(item => (
      <Tag
        closable={!disabled && !item.disabled}
        key={item.value}
        onClose={(e: MouseEvent) => {
          handleChange(item);
          // avoid triggering visibility change of dropdown
          e.stopPropagation();
        }}
      >
        {item.label}
      </Tag>
    ));
    if (canFilterInput) {
      tags.push(
        <input
          ref={inputRef}
          tabIndex={-1}
          readOnly={!filtering}
          value={filterText}
          {...inputEvents}
          key="tags-input"
          className="c-select__tags__input"
        />
      );
    }
    textBox = <div className="c-select__tags">{tags}</div>;
  }
  return (
    <SelectContext.Provider
      value={{
        selectedOptions: selectedOptionProps,
        activeOption,
        handleChange,
        updateActiveOption,
        forwardRef
      }}
    >
      <TooltipCore
        triggerDOM={triggerDom}
        updateTriggerDOM={updateTriggerDom}
        className="c-select__dropdown c-popover--no-triangle"
        visible={isOpen}
        trigger="click"
        onVisibilityChange={onNonClickVisChange}
        style={placeStyle}
        role="listbox"
        ref={forwardRef}
        placement="bottom-left"
        content={content}
        showDelay={SHOW_DELAY}
        hideDelay={HIDE_DELAY}
      >
        <div
          role="combobox"
          className={selectClassName}
          style={style}
          aria-owns={id}
          aria-controls={id}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          {...combEvents}
        >
          {textBox}
          <span className="c-select__suffix">
            {showClear ? (
              <IconClear onClick={e => clearValue(e)} />
            ) : (
              <IconArrowDown
                className={classNames({
                  "c-icon-reverse": isOpen
                })}
              />
            )}
          </span>
        </div>
      </TooltipCore>
    </SelectContext.Provider>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  clearable: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  filterable: PropTypes.bool,
  filter: PropTypes.func,
  multiple: PropTypes.bool,
  loading: PropTypes.bool,
  filterThrottle: PropTypes.number,
  loadingText: PropTypes.string,
  size: PSize,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  onSearch: PropTypes.func,
  async: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
} as PropTypes.ValidationMap<SelectProps>;

Select.displayName = "Select";
