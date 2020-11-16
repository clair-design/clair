import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import {
  CheckboxGroupContextType,
  CheckboxGroupProps,
  CheckboxGroupHandleValue,
  UpdateGroupValueType,
  CheckboxGroupValueType
} from "./types";

export const CheckboxGroupContext = React.createContext<
  CheckboxGroupContextType
>({});

export const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {
  const {
    className,
    name,
    style,
    children,
    value: valueProp,
    defaultValue: defaultValueProp,
    onChange
  } = props;
  const isControlled = "value" in props;
  const defaultValue = defaultValueProp || [];
  const [uncontrolledValue, updateUncontrolledValue] = useState(defaultValue);

  const value2Use: CheckboxGroupValueType = isControlled
    ? (valueProp as CheckboxGroupValueType)
    : uncontrolledValue;

  const registerValue: CheckboxGroupHandleValue = value => {
    if (value2Use.includes(value)) return;
    const newValue = value2Use.concat(value);
    if (!isControlled) {
      updateUncontrolledValue(newValue);
    }
    onChange &&
      onChange({
        target: {
          value: newValue
        }
      });
  };

  const cancelValue: CheckboxGroupHandleValue = value => {
    const newValue = value2Use.filter(val => val !== value);
    if (newValue.length === value2Use.length) return;
    if (!isControlled) {
      updateUncontrolledValue(newValue);
    }
    onChange &&
      onChange({
        target: {
          value: newValue
        }
      });
  };

  const updateGroupValue: UpdateGroupValueType = (isChecked, value) =>
    isChecked ? registerValue(value) : cancelValue(value);

  return (
    <CheckboxGroupContext.Provider
      value={{
        groupValue: value2Use,
        name,
        updateGroupValue
      }}
    >
      <div className={classNames("c-checkbox-group", className)} style={style}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node
} as PropTypes.ValidationMap<CheckboxGroupProps>;
CheckboxGroup.displayName = "CheckboxGroup";
