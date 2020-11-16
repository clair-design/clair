import React, { useState, useRef, useEffect, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import {
  UseCheckedType,
  UseNameType,
  CheckboxProps,
  CheckboxEvent
} from "./types";
import { CheckboxGroupContext } from "./CheckboxGroup";
import { AutoIncreasingCounter } from "@clair/helpers";

const sizes = ["small", "normal", "large"] as const;
const propSizes = PropTypes.oneOf(sizes);
const autoIncrCounter = new AutoIncreasingCounter();

const useChecked: UseCheckedType = (props, groupContext) => {
  const { checked, defaultChecked, value, onChange } = props;
  const { groupValue, updateGroupValue } = groupContext;

  const [uncontrolledChecked, updateUncontrolledChecked] = useState(
    defaultChecked
  );
  const isControlled = "checked" in props;
  const isGroupControlled = Array.isArray(groupValue);

  let checked2Use = Boolean(isControlled ? checked : uncontrolledChecked);
  if (isGroupControlled) {
    if (!value) {
      throw new Error(
        `Invalid props 'value'! Value must be set when controlled by CheckboxGroup.`
      );
    }
    checked2Use = (groupValue as string[]).includes(value);
  }

  const updateChecked = (e: CheckboxEvent) => {
    const {
      target: { checked: newCheckedStatus }
    } = e;
    onChange?.(e);
    if (isGroupControlled) {
      return (
        updateGroupValue && updateGroupValue(newCheckedStatus, value as string)
      );
    }
    !isControlled && updateUncontrolledChecked(newCheckedStatus);
  };

  return [checked2Use, updateChecked];
};

const useName: UseNameType = ({ name = "" }) => {
  const { name: groupName } = useContext(CheckboxGroupContext);
  return groupName || name;
};

export const Checkbox: React.FC<CheckboxProps> = props => {
  const {
    className,
    disabled,
    indeterminate,
    style,
    size,
    value,
    children
  } = props;
  const curRef = useRef<HTMLInputElement>(null);
  const { current: inputId } = useRef(
    `c-checkbox__input-${autoIncrCounter.next()}`
  );
  const { current: labelId } = useRef(
    `c-checkbox__label-${autoIncrCounter.next()}`
  );

  const groupContext = useContext(CheckboxGroupContext);
  const [checked2Use, updateChecked] = useChecked(props, groupContext);
  const name = useName(props);

  useEffect(() => {
    (curRef.current as HTMLInputElement).indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <label
      className={classNames("c-checkbox", className, {
        [`c-checkbox--${size}`]: sizes.some(curSize => size === curSize)
      })}
      style={style}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        aria-labelledby={labelId}
        type="checkbox"
        ref={curRef}
        disabled={disabled}
        checked={Boolean(checked2Use)}
        name={name}
        value={value}
        onChange={updateChecked}
      />
      <span className="c-checkbox__box" />
      <span className="c-checkbox__label" id={labelId}>
        {children}
      </span>
    </label>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  size: propSizes,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};
Checkbox.displayName = "Checkbox";
