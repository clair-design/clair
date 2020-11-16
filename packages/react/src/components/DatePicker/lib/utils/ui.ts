import { PickerType, PanelMode } from "../interface";

/**
 * run different callback by pressed key, e.g.
 * runMatchedCallback(event,
 *   ["Enter Space", () => doSomething()],
 *   ["ArrowUp", () => doSomething2(), preventDefault]
 * )
 */
export function runMatchedCallback<T>(
  event: React.KeyboardEvent,
  ...listeners: Array<[string, (e: React.KeyboardEvent) => T, boolean?]>
): T | undefined {
  const pressed = event.key;
  const matched = listeners.find(([key]) => key.split(/\s+/).includes(pressed));
  const [, callback, shouldPreventDefault] = matched || [];
  if (shouldPreventDefault) event.preventDefault();
  return callback?.(event);
}

/**
 * get next panel mode
 */
export const getNextMode = (type: PickerType, currentMode: PanelMode) => {
  const sequenceMap: { [key: string]: string[] } = {
    date: ["year", "month", "date"],
    week: ["year", "month", "week"],
    month: ["year", "month"],
    quarter: ["year", "quarter"]
  };
  const sequence = sequenceMap[type] || [];
  const nextMode = sequence[sequence.indexOf(currentMode) + 1] || "";
  return nextMode as PanelMode;
};

const typeNames: { [type: string]: string } = {
  date: "日期",
  week: "周",
  month: "月份",
  quarter: "季度",
  year: "年份"
};

export const getPlaceholder = (type: PickerType): string => {
  return `请选择${typeNames[type]}`;
};

export const getRangePlaceholder = (type: PickerType) => {
  const name = typeNames[type];
  return [`开始${name}`, `结束${name}`];
};
