import React, { ReactNode } from "react";
import { ValidateSource } from "async-validator";
import { EventBusType } from "./eventBus";

export type Value = any;

interface Rule extends ValidateSource {
  trigger: EventType;
}

type Rules = Rule[];

interface InfoForAsyncValidator {
  rules: Rules;
  trigger: string;
  value: Value;
  name: string;
}

interface InfoForValidate extends InfoForAsyncValidator {
  eventBus: EventBusType;
}

export type validateResult = {
  message: string;
  isValid: boolean;
  name: string;
};
export interface CallAsyncValidator {
  (arg0: InfoForAsyncValidator): Promise<validateResult>;
}

export interface Validate {
  (arg0: InfoForValidate): Promise<validateResult>;
}

export interface FormItemProps extends ClassNameAndStyle {
  as: AsType;
  prop?: string;
  label?: string;
  labelWidth?: number | string;
  helperText?: string;
  value?: Value;
  rules?: Rules;
  [key: string]: any;
}

interface Values {
  [key: string]: Value;
}
export interface FormProps extends ClassNameAndStyle {
  rules?: Rules;
  inline?: boolean;
  labelPosition?: string;
  labelWidth?: number | string;
  children?: ReactNode;
  onSubmit?: (isValid: boolean, value: GetValueResultItem[]) => void;
  defaultValue?: Values;
}

export type AsType =
  | Parameters<typeof React.createElement>[0]
  | React.ReactElement;

export interface ControllerProps extends ClassNameAndStyle {
  name: string;
  as: AsType;
  rules?: Rules;
  defaultValue?: Value;
  onChangeName?: string;
  onFocusName?: string;
  onBlurName?: string;
  valueName?: string;
  mapValue?: MapValue;
  control: FormControlType;
  [key: string]: any;
}

interface Control4Field {
  name: string;
  defaultValue?: Value;
  value?: Value;
  rules?: Rules;
  fieldType?: AsType;
  valueName?: string;
}

interface GetValueResultItem {
  name: string;
  value: Value;
}
export interface Control4Form {
  id: string;
  reset?: (name: string) => void;
}
export type FormResetType = (nameList?: string[]) => void;
export type FormGetValueType = (nameList?: string[]) => GetValueResultItem[];
export type FormSetValueType = (name: string, value: Value) => void;
export type FormControlType = (param?: Control4Field) => FormRef;
export type FormValidateType = (
  eventType?: EventType | EventType[],
  nameList?: string[]
) => Promise<validateResult[]>;

export interface FormRefParams {
  formID: string;
  eventBus: EventBusType;
  getValue: FormGetValueType;
  setValue: FormSetValueType;
  reset: FormResetType;
  setDefaultValue: FormResetType;
  control: FormControlType;
  validate: FormValidateType;
}

export interface FormContextType {
  formRef: FormRef;
  labelWidth?: string | number;
}

export type EventType = "change" | "focus" | "blur";
type TriggeredTime = number;
export interface FieldState {
  isValidating: boolean;
  isValid: boolean;
  message: string;
  value: any;
  triggeredTime: TriggeredTime;
}

export interface ValidateActionPayload extends FieldState {
  eventType: EventType;
}

interface ValidateAction {
  type: "updateFieldState" | "updateValue" | "eventTriggered";
  payload: ValidateActionPayload;
}

export type FieldReducerType = React.Reducer<FieldState, ValidateAction>;
export type ValidateDispatchType = React.Dispatch<ValidateAction>;

export interface FieldData {
  valueName: string;
  value: Value;
  defaultValue: Value;
}
export interface Name2Field {
  [FromID: string]: {
    [name: string]: FieldData;
  };
}
export interface Name2Rules {
  [FromID: string]: {
    [name: string]: Rules;
  };
}

interface TriggeredEventItem {
  eventType: EventType;
  event: any;
}

export type FormRef = React.MutableRefObject<FormRefParams>;
export type MapValue = (e: any) => any;
export type TriggeredEventList = TriggeredEventItem[];
type TriggeredEventListRef = React.MutableRefObject<TriggeredEventList>;

export interface UseEventDelegationParams {
  formRef: FormRef;
  triggeredEventListRef: TriggeredEventListRef;
  name: string;
  triggeredTime: TriggeredTime;
  eventType: EventType | null;
  control: FormControlType;
  mapValue: MapValue;
}

export type HandlerName2EventDelegation = {
  [key: string]: (e: any) => void;
};
