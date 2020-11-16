import React, { useRef, useState } from "react";
import classNames from "classnames";
import { isFunction } from "lodash-es";
import { InputGroup } from "./InputGroup";
import { IconClear } from "@components/Icon";
import { InputProps, InputPropTypes, sizes, types } from "./types";

export const Input: React.FC<InputProps> = ({
  value,
  defaultValue,
  htmlType = "text",
  size = "normal",
  type,
  disabled = false,
  prefix,
  suffix,
  prefixIcon,
  suffixIcon,
  clearable = false,
  onChange,
  ...rest
}) => {
  const myRef = useRef<HTMLInputElement>(null);
  const [clearIconVisible, setClearIconVisible] = useState<boolean>(
    clearable && Boolean(value || defaultValue)
  );
  const className = classNames("c-input", {
    [`c-input--${size}`]: sizes.some(t => t === size),
    [`c-input--${type}`]: types.some(t => t === type)
  });

  const affixClassName = classNames("c-input-affix-container", {
    [`c-input-affix-container--${type}`]: types.some(t => t === type),
    "c-input-affix-container--disabled": disabled
  });

  const isGroup = prefix || suffix;

  const isAffix = prefixIcon || suffixIcon || clearable;

  const onChangeHandler = (e: CFormEvent) => {
    if (clearable) {
      if ((e.target as HTMLInputElement).value) {
        setClearIconVisible(true);
      } else {
        setClearIconVisible(false);
      }
    }

    if (isFunction(onChange)) {
      onChange(e);
    }
  };

  const onClearHandler = (e: React.MouseEvent) => {
    if (!myRef.current) {
      return false;
    }

    onChangeHandler({
      target: { value: "" },
      nativeEvent: e.nativeEvent
    });

    if (typeof value === "undefined") {
      myRef.current.value = "";
    }
  };

  const clearIcon = (
    <span className="c-input-suffix">
      <IconClear
        onClick={onClearHandler}
        onMouseDown={e => {
          e.preventDefault();
        }}
      />
    </span>
  );

  const input = (
    <input
      ref={myRef}
      type={htmlType}
      className={className}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      onChange={onChangeHandler}
      {...rest}
    />
  );

  const inputWrap = isAffix ? (
    <div className={affixClassName}>
      {prefixIcon ? <span className="c-input-prefix">{prefixIcon}</span> : null}
      {input}
      {clearIconVisible ? clearIcon : null}
      {suffixIcon ? <span className="c-input-suffix">{suffixIcon}</span> : null}
    </div>
  ) : (
    input
  );

  if (isGroup) {
    return (
      <InputGroup prefix={prefix} suffix={suffix}>
        {inputWrap}
      </InputGroup>
    );
  }

  return inputWrap;
};

Input.propTypes = InputPropTypes;
