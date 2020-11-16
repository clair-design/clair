import { useReducer, Reducer, useEffect } from "react";
import { isNil } from "@clair/helpers";
import { createError } from "@src/utils";
import { SliderTypes } from "../util";

interface SliderState {
  start: number;
  end: number;
  value?: number | number[];
}

interface SliderAction {
  type: SliderTypes;
  value: number;
}

export type UpdateValue = (type: SliderTypes, value: number) => void;
export type UseSliderType = (props: SliderState) => [SliderState, UpdateValue];

const reducer: Reducer<SliderState, SliderAction> = (
  { start, end },
  action
) => {
  switch (action.type) {
    case "start":
      return { start: action.value, end };
    case "end":
      return { start, end: action.value };
    default:
      throw createError("TypeError", "Invalid type");
  }
};

export const useSliderValue: UseSliderType = ({ start, end, value }) => {
  const [state, dispatch] = useReducer(reducer, {
    start,
    end
  });
  const isControlled = !isNil(value);

  useEffect(() => {
    if (!isControlled) return;
    dispatch({ type: "start", value: start });
    dispatch({ type: "end", value: end });
  }, [end, isControlled, start]);

  const updateState: UpdateValue = (type, value) => {
    if (!isControlled) {
      dispatch({ type, value });
    }
  };

  return [state, updateState];
};
