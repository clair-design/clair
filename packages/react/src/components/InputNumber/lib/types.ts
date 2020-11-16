import React from "react";
import PropTypes from "prop-types";

const sizes = ["normal", "small", "large"] as const;
type Size = typeof sizes[number];

const controlPosition = ["left-right", "up-down"] as const;
type ControlPosition = typeof controlPosition[number];

export interface InputNumberProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  stepFixed?: boolean;
  precision?: number;
  size?: Size;
  disabled?: boolean;
  controlPosition?: ControlPosition;
  onChange?: (e: CFormEvent<number | undefined>) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

export const InputNumberPropTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  stepFixed: PropTypes.bool,
  precision: PropTypes.number,
  size: PropTypes.oneOf([...sizes]),
  disabled: PropTypes.bool,
  controlPosition: PropTypes.oneOf([...controlPosition]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

// ======================== value States ========================
export interface ValueStateProps {
  step: number;
  stepFixed: boolean;
  min: number;
  max: number;
  precision?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (e: CFormEvent<number | undefined>) => void;
}

export interface ValueParseOption {
  min: number;
  max: number;
  precision?: number;
  step: number;
  stepFixed: boolean;
  initialValue?: number;
}

// ======================== Control ========================
export interface ControlProps {
  actualValue: number | undefined;
  min: number;
  max: number;
  disabled: boolean;
  controlPosition: ControlPosition;
  operate: (factor: 1 | -1) => void;
}

export const ControlPropsTypes = {
  actualValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  controlPosition: PropTypes.oneOf([...controlPosition]),
  operate: PropTypes.func
} as PropTypes.ValidationMap<ControlProps>;

// ======================== Input ========================
export interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  displayedValue: string;
  disabled: boolean;
  updateValue: (val: number | undefined) => void;
  updateDisplayedValue: React.Dispatch<React.SetStateAction<string>>;
  operate: (factor: 1 | -1) => void;
  min: number;
  max: number;
  actualValue: number | undefined;
}

export const InputPropsTypes = {
  inputRef: PropTypes.object,
  displayedValue: PropTypes.string,
  disabled: PropTypes.bool,
  updateValue: PropTypes.func,
  updateDisplayedValue: PropTypes.func,
  operate: PropTypes.func,
  actualValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
} as PropTypes.ValidationMap<InputProps>;
