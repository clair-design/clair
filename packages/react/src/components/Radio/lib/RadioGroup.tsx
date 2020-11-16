import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { RadioGroupContext } from "./Context";
import { Radio } from "./Radio";
import { RadioButton } from "./RadioButton";
import { AutoIncreasingCounter } from "@clair/helpers";

const counter = new AutoIncreasingCounter();

export const RadioGroup: React.FC<RadioGroupProps> = props => {
  const {
    options,
    name,
    disabled,
    value,
    children,
    className,
    onChange,
    ...rest
  } = props;

  const contextValue = {
    value,
    disabled,
    name: name || `radio-${counter.next()}`
  };

  const childNodes = options
    ? options.map(({ label, ...rest }, i) => (
        <Radio key={i} {...rest} onChange={onChange}>
          {label}
        </Radio>
      ))
    : React.Children.map(children, child => {
        const node = child as React.ReactElement;
        const { type } = node;

        if (type === Radio || type === RadioButton) {
          return React.cloneElement(node, { onChange });
        }
        return node;
      });

  return (
    <div
      className={classnames("c-radio-group", className)}
      role="radiogroup"
      {...rest}
    >
      <RadioGroupContext.Provider value={contextValue}>
        {childNodes}
      </RadioGroupContext.Provider>
    </div>
  );
};

const valueTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]).isRequired;

RadioGroup.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  value: valueTypes,

  options: PropTypes.array,

  onChange: PropTypes.func,

  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
} as PropTypes.ValidationMap<RadioGroupProps>;

RadioGroup.displayName = "RadioGroup";

type RadioGroupEvent = React.ChangeEvent<HTMLInputElement>;
type EventHandler = React.EventHandler<RadioGroupEvent>;

interface RadioOption {
  label: string;
  value: number | string | boolean;
  disabled?: boolean;
}

interface RadioGroupProps {
  name?: string;
  disabled?: boolean;
  value: number | string | boolean;

  options?: RadioOption[];

  onChange?: EventHandler;

  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
