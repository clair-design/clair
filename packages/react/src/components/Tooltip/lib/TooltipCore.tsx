import React, { useRef } from "react";
import PropTypes from "prop-types";
import useClickAway from "react-use/esm/useClickAway";
import { SharedDOMContext } from "@src/utils";
import { PopOver } from "./PopOver";
import { FindDOMWrapper } from "./FindDOMWrapper";
import {
  usePopOverEvents,
  useProps,
  useTabIndex,
  useTrigger,
  useTriggerDOM,
  useTriggerEventArgs,
  useTriggerEventsEffect,
  useVisibility,
  useVisibilityUpdater
} from "@components/Tooltip/lib/hooks/tooltip";
import {
  ForwardRefProps,
  PAppendTarget,
  PPlacement,
  PTheme,
  PTrigger,
  TooltipCoreOwnProps,
  TooltipCoreProps
} from "@components/Tooltip/lib/types/tooltip";

// TODO: theme
export const TooltipCore: React.FC<
  TooltipCoreProps & ForwardRefProps & TooltipCoreOwnProps
> = React.forwardRef<
  HTMLDivElement,
  TooltipCoreProps & ForwardRefProps & TooltipCoreOwnProps
>((props, ref) => {
  const propsAfterPatch = useProps(props);
  const {
    content,
    children,
    trigger,
    showDelay,
    placement,
    style,
    className,
    role,
    appendTarget
  } = propsAfterPatch;
  const [triggerDOM, updateTriggerDOM] = useTriggerDOM(propsAfterPatch);
  const trigger2Use = useTrigger(trigger);
  const [visible2Use, toggleVisibility] = useVisibility(propsAfterPatch);
  const { show, hide, toggle } = useVisibilityUpdater(toggleVisibility);
  const triggerEventListenerArgs = useTriggerEventArgs(trigger2Use, {
    show,
    hide,
    toggle
  });

  // TODO: a11y
  const child = React.Children.only(children);
  // if no trigger is provided, use hover + focus strategy
  const focusAttr = useTabIndex(trigger2Use);

  // when click other part of the page
  // tooltip should be hided if not controlled by props.visible
  const popOverRef = useRef<HTMLDivElement | null>(null);
  const popOverRef2Use = ref || popOverRef;
  const unbindRef = useRef(null);
  const ref2Use = visible2Use ? popOverRef2Use : unbindRef;
  useClickAway(ref2Use as React.RefObject<HTMLDivElement>, e => {
    if (triggerDOM?.contains(e.target as Element)) {
      return;
    }
    hide("away");
  });

  useTriggerEventsEffect(triggerDOM, triggerEventListenerArgs);

  const popOverEvents = usePopOverEvents(triggerEventListenerArgs);

  // override onClick
  // since onClick on PopOver should NOT toggle the visibility of tooltip
  return (
    <SharedDOMContext.Provider
      value={{
        dom: triggerDOM,
        updateDom: updateTriggerDOM
      }}
    >
      <FindDOMWrapper>{child}</FindDOMWrapper>
      <PopOver
        visible={visible2Use}
        className={className}
        style={style}
        placement={placement}
        ref={popOverRef2Use}
        role={role}
        showDelay={showDelay}
        appendTarget={appendTarget}
        {...focusAttr}
        {...popOverEvents}
        onClick={() => void 0}
      >
        {content}
      </PopOver>
    </SharedDOMContext.Provider>
  );
});

export const propTypes = {
  content: PropTypes.node.isRequired,
  placement: PPlacement,
  trigger: PTrigger,
  visible: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
  showDelay: PropTypes.number,
  hideDelay: PropTypes.number,
  theme: PTheme,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  role: PropTypes.string,
  appendTarget: PAppendTarget
} as PropTypes.ValidationMap<TooltipCoreProps>;

const TooltipCoreOwnPropTypes = {
  triggerDOM: PropTypes.object,
  updateTriggerDOM: PropTypes.func
};

TooltipCore.propTypes = {
  ...propTypes,
  ...TooltipCoreOwnPropTypes
} as PropTypes.ValidationMap<TooltipCoreProps>;

TooltipCore.displayName = "TooltipCore";
