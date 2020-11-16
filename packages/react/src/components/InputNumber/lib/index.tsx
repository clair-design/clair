import React, { useCallback, useRef } from "react";
import classNames from "classnames";
import useValue from "./hooks/useValue";
import { Controls } from "./components/controls";
import { Input } from "./components/input";
import { accurateAdd } from "./util";
import { InputNumberProps, InputNumberPropTypes } from "./types";

export const InputNumber: React.FC<InputNumberProps> = props => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    value,
    defaultValue,
    step = 1,
    stepFixed = false,
    min = -Infinity,
    max = Infinity,
    precision,
    disabled = false,
    size = "normal",
    controlPosition = "left-right",
    onChange,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const [
    actualValue,
    displayedValue,
    updateValue,
    updateDisplayedValue
  ] = useValue({
    value,
    defaultValue,
    step,
    stepFixed,
    min,
    max,
    precision,
    onChange
  });

  // add / subtract by step
  const operate = useCallback(
    (factor: 1 | -1) => {
      if (disabled) return;

      const nextValue = accurateAdd(Number(displayedValue) ?? 0, step * factor);
      updateValue(nextValue);

      setTimeout(() => {
        inputRef.current?.focus();
      });
    },
    [disabled, step, updateValue, displayedValue]
  );

  const inputNumberClassNames = classNames(
    "c-input-number",
    `c-input-number--${size}`,
    `c-input-number--${controlPosition}`
  );

  const sharedProps = {
    min,
    max,
    disabled,
    actualValue,
    operate
  };

  const controlsProps = {
    ...sharedProps,
    controlPosition
  };

  const inputProps = {
    ...sharedProps,
    inputRef,
    displayedValue,
    updateValue,
    updateDisplayedValue
  };

  return (
    <div
      className={inputNumberClassNames}
      aria-disabled={disabled}
      tabIndex={-1}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      <Controls {...controlsProps} />
      <Input {...inputProps} />
    </div>
  );
};

InputNumber.propTypes = InputNumberPropTypes;
