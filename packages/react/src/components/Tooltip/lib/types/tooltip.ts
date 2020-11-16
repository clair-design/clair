import { createError, SharedDOMInterface } from "@src/utils";
import React from "react";
import PropTypes from "prop-types";

const triggers = ["hover", "click", "focus"] as const;
export type SingleTrigger = typeof triggers[number];
export type Trigger = SingleTrigger | SingleTrigger[];
export const PTrigger = PropTypes.oneOfType([
  PropTypes.oneOf([...triggers]),
  PropTypes.arrayOf(PropTypes.oneOf([...triggers]))
]);
const themes = ["dark", "light"] as const;
export type Theme = typeof themes[number];
export const PTheme = PropTypes.oneOf([...themes]);
export type VisibilitySource = Trigger | "away";
export type OnVisibilityChange = (event: {
  detail: { visible: boolean; source: VisibilitySource };
}) => void;

export const placements = [
  "top",
  "right",
  "bottom",
  "left",
  "top-left",
  "top-right",
  "right-top",
  "right-bottom",
  "bottom-right",
  "bottom-left",
  "left-bottom",
  "left-top"
] as const;
export type Placement = typeof placements[number];

export interface TooltipCoreProps {
  content: React.ReactNode;
  placement?: Placement;
  visible?: boolean;
  onVisibilityChange?: OnVisibilityChange;
  showDelay?: number;
  hideDelay?: number;
  trigger?: Trigger;
  theme?: Theme;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  role?: string;
  appendTarget?: HTMLElement;
}

export interface TooltipCoreOwnProps {
  triggerDOM?: SharedDOMInterface["dom"];
  updateTriggerDOM?: SharedDOMInterface["updateDom"];
}

// since Tooltip does not need it as required
export interface ForwardRefProps {
  ref?: React.Ref<HTMLDivElement>;
}

// how children would trigger to show tooltip
type TriggerEvent =
  | "onClick"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur";
export type TriggerEventListenerArgs = [TriggerEvent, EventListener, boolean?];

export const PAppendTarget: PropTypes.ValidationMap<
  TooltipCoreProps
>["appendTarget"] = (props, propName) => {
  const value = props[propName];
  if (!value) {
    return null;
  }
  const isElement = value instanceof Element;
  if (!isElement) {
    return createError(
      `Invalid \`${propName}\``,
      `expect \`${propName}\` to be Element, but got ${typeof value} `
    );
  }
  return null;
};
export const PPlacement = PropTypes.oneOf([...placements]);
