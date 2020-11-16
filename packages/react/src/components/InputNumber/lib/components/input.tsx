import React, { useCallback } from "react";
import { isNaN } from "lodash-es";
import { InputProps, InputPropsTypes } from "../types";
import { parseStrToNumber } from "../util";

export const Input: React.FC<InputProps> = props => {
  const {
    inputRef,
    disabled,
    displayedValue,
    updateDisplayedValue,
    updateValue,
    operate,
    min,
    max,
    actualValue
  } = props;

  const emitChange = useCallback(() => {
    const strValue = displayedValue.trim();

    updateDisplayedValue(strValue);
    updateValue(parseStrToNumber(strValue));
  }, [displayedValue, updateDisplayedValue, updateValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === "Enter") {
      emitChange();
    } else if (key === "ArrowUp") {
      e.preventDefault();
      operate(1);
    } else if (key === "ArrowDown") {
      e.preventDefault();
      operate(-1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;

    const val =
      ["-", "+"].includes(currentValue) || !isNaN(Number(currentValue))
        ? currentValue
        : displayedValue;

    updateDisplayedValue(val);
  };

  return (
    <div className="c-input-number__input">
      <input
        className="c-input-number__inner"
        type="text"
        ref={inputRef}
        autoComplete="off"
        role="spinbutton"
        aria-disabled={disabled}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={actualValue}
        min={min}
        max={max}
        disabled={disabled}
        value={displayedValue}
        tabIndex={disabled ? -1 : 0}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={emitChange}
      />
    </div>
  );
};

Input.propTypes = InputPropsTypes;
