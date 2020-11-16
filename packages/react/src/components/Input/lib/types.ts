import React from "react";
import PropTypes from "prop-types";
export const sizes = ["large", "normal", "small"] as const;
export const types = ["success", "warning", "error"] as const;

export type Sizes = typeof sizes[number];
export type Types = typeof types[number];
export const PSize = PropTypes.oneOf([...sizes]);
export const PType = PropTypes.oneOf([...types]);

export interface AutoSize {
  minRows?: number;
  maxRows?: number;
}

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "onChange"
  > {
  value?: string;
  defaultValue?: string;
  htmlType?: string;
  size?: Sizes;
  type?: Types;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  clearable?: boolean;
  onChange?: (e: CFormEvent) => void;
}

export interface PasswordProps extends InputProps {
  allowToggle?: boolean;
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  defaultRows?: number;
  type?: Types;
  size?: Sizes;
  autoSize?: AutoSize | boolean;
  onChange?: React.ChangeEventHandler;
}

export const InputPropTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  htmlType: PropTypes.string,
  size: PSize,
  type: PType,
  disabled: PropTypes.bool,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
  clearable: PropTypes.bool,
  onChange: PropTypes.func
};

export const PasswordPropTypes = {
  allowToggle: PropTypes.bool,
  ...InputPropTypes
};

export const TextAreaPropTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  size: InputPropTypes.size,
  type: InputPropTypes.type,
  defaultRows: PropTypes.number,
  autoSize: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func
};
