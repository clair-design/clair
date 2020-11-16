import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { RadioGroupContext } from "./Context";

export const Radio: React.FC<RadioProps> = props => {
  const context = useContext(RadioGroupContext);

  const {
    value,
    name,
    disabled,
    defaultChecked,
    checked,
    children,
    onChange,
    className,
    ...rest
  } = props;

  const isControlled = typeof checked === "boolean";

  let inputProps: HTMLRadioProps = {
    name,
    disabled,
    defaultChecked,
    value: String(value)
  };

  if (context) {
    inputProps = {
      name: context.name,
      disabled: context.disabled || disabled,
      checked: props.value === context.value,
      value: String(value)
    };
  } else if (isControlled) {
    inputProps.checked = checked;
  }

  const handleChange: EventHandler = e => onChange?.(e);

  return (
    <label className={classnames(className, "c-radio")} {...rest}>
      <input
        className="c-radio__input"
        type="radio"
        onChange={handleChange}
        {...inputProps}
      />
      <span className="c-radio__box" />
      <span className="c-radio__label">{children}</span>
    </label>
  );
};

Radio.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,

  onChange: PropTypes.func,

  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

Radio.displayName = "Radio";

type HTMLRadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type RadioEvent = React.ChangeEvent<HTMLInputElement>;
type EventHandler = React.EventHandler<RadioEvent>;

export interface RadioProps {
  name?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  value: number | string | boolean;

  onChange?: EventHandler;

  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
