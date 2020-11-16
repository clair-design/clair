import { useState, useCallback, useRef } from "react";
import { useUpdateEffect } from "react-use";
import { isNil } from "lodash-es";
import { formatValue, parseStrToNumber } from "../util";
import { ValueStateProps } from "../types";

export default function useValue({
  value,
  defaultValue,
  onChange,
  ...rest
}: ValueStateProps) {
  const isControlled = !isNil(value);
  const initialValue = useRef(value ?? defaultValue);
  const formattedValue = formatValue(initialValue.current, rest);

  const [actualValue, updateActualValue] = useState(
    parseStrToNumber(formattedValue)
  );
  const [displayedValue, updateDisplayedValue] = useState<string>(
    formattedValue
  );

  const getFormattedValue = useCallback(
    (value?: number) => {
      const formattedValue = formatValue(value, {
        ...rest,
        initialValue: initialValue.current ?? 0
      });
      return [formattedValue, parseStrToNumber(formattedValue)] as const;
    },
    [rest]
  );

  // update when value changed
  useUpdateEffect(() => {
    const [formattedStrValue, formattedNumValue] = getFormattedValue(value);

    updateDisplayedValue(formattedStrValue);
    updateActualValue(formattedNumValue);
  }, [value]);

  const updateValue = useCallback(
    (val?: number) => {
      const [nextDisplayedValue, nextActualValue] = getFormattedValue(val);

      if (nextActualValue !== actualValue) {
        onChange?.({
          target: {
            value: nextActualValue
          }
        });
      }

      if (isControlled) return;

      updateDisplayedValue(nextDisplayedValue);
      updateActualValue(nextActualValue);
    },
    [isControlled, onChange, actualValue, getFormattedValue]
  );

  return [
    actualValue,
    displayedValue,
    updateValue,
    updateDisplayedValue
  ] as const;
}
