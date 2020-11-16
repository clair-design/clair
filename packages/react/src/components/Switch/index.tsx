import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AutoIncreasingCounter } from "@clair/helpers";
import { isColorValid } from "../Tag/index";

const autoIncrCounter = new AutoIncreasingCounter();

const sizes = ["normal", "small"] as const;
export type Size = typeof sizes[number];
const PSize = PropTypes.oneOf([...sizes]);

type Text = React.ReactNode;
const PText = PropTypes.node;

type EventHandler = (event: CFormEvent) => void;

export interface SwitchProps {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  checkedChildren?: Text;
  unCheckedChildren?: Text;
  size?: Size;
  checkedColor?: string;
  unCheckedColor?: string;
  onChange?: EventHandler;
}

export const Switch: React.FC<SwitchProps> = props => {
  const {
    defaultChecked = false,
    disabled = false,
    checkedChildren,
    unCheckedChildren,
    size = "normal",
    checkedColor,
    unCheckedColor,
    onChange = null
  } = props;

  const className: string = classNames(
    "c-switch",
    size !== "normal" ? `c-switch--${size}` : null
  );

  const isControlled = "checked" in props;
  const [defChecked, setChecked] = useState(defaultChecked);
  const checked = isControlled ? props.checked : defChecked;

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const isChecked = !checked;
    if (!isControlled) {
      setChecked(isChecked);
    }
    const event: CFormEvent = {
      target: {
        value: isChecked
      },
      nativeEvent: e.nativeEvent
    };
    typeof onChange === "function" && onChange(event);
  };

  const getStyles = (color: string | undefined) => {
    return color && isColorValid(color) ? { background: color } : {};
  };

  const styles: object = checked
    ? getStyles(checkedColor)
    : getStyles(unCheckedColor);

  const hasChildren = Boolean(checkedChildren && unCheckedChildren);

  const labelIdRef = useRef(`c-switch__label-${autoIncrCounter.next()}`);
  const [labelId, updateLabelId] = useState<string | undefined>(
    labelIdRef.current
  );

  useEffect(() => {
    updateLabelId(() => {
      return hasChildren ? labelIdRef.current : undefined;
    });
  }, [hasChildren]);

  const label = checked ? "开" : "关";
  const ariaLabel = hasChildren ? undefined : label;

  return (
    <label
      className={className}
      // eslint-disable-next-line
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelId}
      aria-label={ariaLabel}
    >
      <input
        type="checkbox"
        className="c-switch__input"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="c-switch__box" style={styles} />
      <span className="c-switch__label" id={labelId}>
        {checked ? checkedChildren : unCheckedChildren}
      </span>
    </label>
  );
};

Switch.propTypes = {
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  checkedChildren: PText,
  unCheckedChildren: PText,
  size: PSize,
  checkedColor: PropTypes.string,
  unCheckedColor: PropTypes.string,
  onChange: PropTypes.func
};

Switch.displayName = "Switch";
