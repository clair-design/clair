import { FilterFunction, Value } from "@components/Select/lib/helper";
import PropTypes from "prop-types";

export const sizes = ["large", "normal", "small"] as const;
export type Size = typeof sizes[number];
export const PSize = PropTypes.oneOf([...sizes]);
export type FormEventHandler = (event: CFormEvent) => void;

export interface SelectProps extends ClassNameAndStyle {
  clearable?: boolean;
  defaultValue?: Value;
  disabled?: boolean;
  filterable?: boolean;
  filter?: FilterFunction;
  multiple?: boolean;
  loading?: boolean;
  loadingText?: string;
  size?: Size;
  value?: Value;
  onBlur?: FormEventHandler;
  onChange?: FormEventHandler;
  onClear?: FormEventHandler;
  onFocus?: FormEventHandler;
  onSearch?: (e: CCustomEvent<{ query: string }>) => void;
  async?: boolean;
  onVisibilityChange?: (e: CCustomEvent<{ visible: boolean }>) => void;
  placeholder?: string;
  filterThrottle?: number;
}
