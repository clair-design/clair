import React, { useState, useRef, useEffect, useCallback } from "react";
import { TextAreaProps, sizes, types, TextAreaPropTypes } from "./types";
import calcTextAreaRows from "./calcTextAreaRows";
import classNames from "classnames";
import { isFunction } from "lodash-es";

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  defaultValue,
  size = "normal",
  defaultRows,
  type,
  disabled,
  autoSize,
  onChange,
  style,
  ...rest
}) => {
  const myRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRow] = useState(defaultRows);
  const className = classNames("c-input", "c-textarea", {
    [`c-input--${size}`]: sizes.some(t => t === size),
    [`c-input--${type}`]: types.some(t => t === type),
    ["c-input-disabled"]: disabled
  });

  const mergedStyle = Object.assign(
    {},
    style,
    autoSize || defaultRows ? { height: "auto" } : {}
  );

  const onResizeTextArea = useCallback(() => {
    if (myRef && myRef.current && autoSize) {
      let rows: number;
      if (typeof autoSize === "boolean") {
        rows = calcTextAreaRows(myRef.current);
      } else {
        const { minRows, maxRows } = autoSize;
        rows = calcTextAreaRows(myRef.current, minRows, maxRows);
      }
      setRow(rows);
    }
  }, [autoSize]);

  const onChangeHandler: React.ChangeEventHandler = e => {
    if (isFunction(onChange)) {
      onChange(e);
    }
    onResizeTextArea();
  };

  useEffect(() => {
    onResizeTextArea();
  }, [onResizeTextArea]);

  return (
    <textarea
      ref={myRef}
      className={className}
      disabled={disabled}
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeHandler}
      style={mergedStyle}
      {...rest}
    />
  );
};

TextArea.propTypes = TextAreaPropTypes;
