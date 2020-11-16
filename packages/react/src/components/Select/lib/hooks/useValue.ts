import { SelectProps } from "@components/Select/lib/types";
import { useState } from "react";
import { generateFormEvent, Value } from "@components/Select/lib/helper";

type MaybeArray<T> = T | T[];
function castArray<T extends any>(arg: MaybeArray<T>): T[] {
  if (Array.isArray(arg)) {
    return arg;
  }
  return [arg];
}

export const useValue = (props: SelectProps) => {
  const isControlled = "value" in props;
  const initiateValue = () => {
    return castArray(props.defaultValue ?? []);
  };
  const [ownValue, setOwnValue] = useState(initiateValue);
  const setValue = (value: Value) => {
    props.onChange?.(generateFormEvent(value));

    if (!isControlled) {
      const valueRef = castArray(value);
      setOwnValue(valueRef);
    }
  };
  let value = (isControlled ? props.value : ownValue) ?? [];
  value = castArray(value);
  return [value, setValue] as const;
};
