import { ChangeEvent, ReactNode } from "react";

export type CheckboxGroupValueType = string[];
export type CheckboxEventHandlerType = (e: CheckboxEvent) => void;
export type CheckboxGroupOnChangeType = (e: CheckboxGroupEvent) => void;
export type CheckboxEvent = ChangeEvent<HTMLInputElement>;
export interface CheckboxGroupEvent {
  target: {
    value: CheckboxGroupValueType;
  };
}
export interface CheckboxProps extends ClassNameAndStyle {
  checked?: boolean;
  defaultChecked?: boolean;
  size?: "small" | "normal" | "large";
  indeterminate?: boolean;
  name?: string;
  disabled?: boolean;
  value?: string;
  children?: ReactNode;
  onChange?: CheckboxEventHandlerType;
}

export interface CheckboxGroupProps extends ClassNameAndStyle {
  children?: ReactNode;
  name?: string;
  value?: CheckboxGroupValueType;
  onChange?: CheckboxGroupOnChangeType;
  defaultValue?: CheckboxGroupValueType;
}

export type CheckboxGroupHandleValue = (val: string) => void;
export type UpdateGroupValueType = (isChecked: boolean, value: string) => void;

export interface CheckboxGroupContextType {
  groupValue?: string[];
  name?: string;
  updateGroupValue?: UpdateGroupValueType;
}

export type UpdateChecked = (e: CheckboxEvent) => void;
export type UseCheckedType = (
  props: CheckboxProps,
  groupContext: CheckboxGroupContextType
) => [boolean, UpdateChecked];
export type UseNameType = (props: CheckboxProps) => string;
