import { useEffect, useRef, useState } from "react";
import { DOM, SharedDOMInterface } from "@src/utils";
import {
  SingleTrigger,
  TooltipCoreProps,
  TriggerEventListenerArgs,
  VisibilitySource
} from "@components/Tooltip/lib/types/tooltip";

const defaultProps = {
  placement: "top" as const,
  showDelay: 0,
  hideDelay: 100,
  trigger: ["hover", "focus"] as SingleTrigger[]
};
export const useProps = (props: TooltipCoreProps) => {
  return {
    ...defaultProps,
    ...props
  };
};
type PropsAfterPatch = ReturnType<typeof useProps>;
type VisibilityProps = Pick<
  PropsAfterPatch,
  "visible" | "showDelay" | "hideDelay" | "onVisibilityChange"
>;

export const useTrigger = (trigger: PropsAfterPatch["trigger"]) =>
  Array.isArray(trigger) ? trigger : [trigger];

type ToggleVisibility = (source: VisibilitySource, toShow?: boolean) => void;
type ShowFunction = (source: VisibilitySource) => void;
type HideFunction = ShowFunction;
type ToggleFunction = ShowFunction;

interface VisibilityUpdater {
  show: ShowFunction;
  hide: HideFunction;
  toggle: ToggleFunction;
}

export const useVisibility = (props: VisibilityProps) => {
  const { visible, showDelay, hideDelay, onVisibilityChange } = props;
  const usingPropsVisible: boolean = typeof visible === "boolean";

  const [ownVisible, updateOwnVisible] = useState(false);
  const visible2Use: boolean = usingPropsVisible
    ? (visible as boolean)
    : ownVisible;
  const timer = useRef(0);
  const toggleVisibility = (source: VisibilitySource, toShow?: boolean) => {
    clearTimeout(timer.current);
    const isManual = typeof toShow === "boolean";
    const toShow2Use = isManual ? (toShow as boolean) : !visible2Use;
    const delay = toShow2Use ? showDelay : hideDelay;
    const updateVisibility = () => {
      updateOwnVisible(() => toShow2Use);
      onVisibilityChange?.({ detail: { visible: toShow2Use, source } });
    };
    if (delay > 0) {
      timer.current = window.setTimeout(updateVisibility, delay);
    } else {
      updateVisibility();
    }
  };
  return [visible2Use, toggleVisibility] as const;
};
// accept from props, but can also be self provided
export const useTriggerDOM = (
  props: PropsAfterPatch
): [SharedDOMInterface["dom"], SharedDOMInterface["updateDom"]] => {
  const [ownTriggerDOM, updateOwnTriggerDOM] = useState<
    SharedDOMInterface["dom"]
  >(null);
  if (["triggerDOM", "updateTriggerDOM"].every(key => key in props)) {
    // eslint-disable-next-line
    // @ts-ignore
    return [props.triggerDOM, props.updateTriggerDOM];
  }
  return [ownTriggerDOM, updateOwnTriggerDOM];
};
export const useVisibilityUpdater = (toggleVisibility: ToggleVisibility) => {
  const show = (source: VisibilitySource) => toggleVisibility(source, true);
  const hide = (source: VisibilitySource) => toggleVisibility(source, false);
  const toggle = (source: VisibilitySource = "click") => {
    toggleVisibility(source);
  };

  return {
    show,
    hide,
    toggle
  };
};
export const useTriggerEventArgs = (
  triggers: SingleTrigger[],
  visibilityUpdater: VisibilityUpdater
) => {
  const { show, hide, toggle } = visibilityUpdater;
  const clickHandler = () => toggle("click");

  const eventListenerArgs: TriggerEventListenerArgs[] = triggers.reduce<
    TriggerEventListenerArgs[]
  >((last, triggerItem) => {
    const [showWithSource, hideWithSource] = [
      () => show(triggerItem),
      () => hide(triggerItem)
    ];
    if (triggerItem === "click") {
      return [...last, ["onClick", clickHandler]];
    } else if (triggerItem === "hover") {
      return [
        ...last,
        ["onMouseEnter", showWithSource],
        ["onMouseLeave", hideWithSource]
      ];
    } else if (triggerItem === "focus") {
      return [...last, ["onFocus", showWithSource], ["onBlur", hideWithSource]];
    }
    return last;
  }, []);

  return eventListenerArgs;
};
export const useTriggerEventsEffect = (
  triggerDOM: DOM,
  triggerEventArgs: TriggerEventListenerArgs[]
) => {
  // handle event for children, aka the trigger
  useEffect(() => {
    // if using visible from props
    // no need to respond to events
    if (triggerDOM) {
      const eventArgs2Use = triggerEventArgs.map(eventListenerArg => {
        const [eventName, ...rest] = eventListenerArg;
        // on{Event} -> event
        const domEventName = eventName.replace(/^on/, "").toLowerCase();
        return [domEventName, ...rest] as [
          "click" | "focus" | "blur" | "mouseenter" | "mouseleave",
          EventListener,
          boolean?
        ];
      });
      eventArgs2Use.forEach(eventListenerArg => {
        // reason using dom event listener is that
        // children may not export on{Event} props
        triggerDOM.addEventListener(...eventListenerArg);
      });
      return () => {
        eventArgs2Use.forEach(eventListenerArg => {
          triggerDOM.removeEventListener(...eventListenerArg);
        });
      };
    }
  }, [triggerDOM, triggerEventArgs]);
};
export const usePopOverEvents = (triggerEvents: TriggerEventListenerArgs[]) => {
  return triggerEvents.reduce((last, eventAndHandlerEntry) => {
    const [eventName, handler] = eventAndHandlerEntry;
    return {
      ...last,
      [eventName]: handler
    };
  }, {});
};
export const useTabIndex = (triggers: SingleTrigger[]) => {
  const usingFocus: boolean = triggers.some(trigger => trigger === "focus");
  return usingFocus
    ? {
        tabIndex: 0
      }
    : {};
};
