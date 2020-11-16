import { calcPopoverPosition } from "@clair/helpers";
import React, {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import { useMonoEffect } from "use-event-hook";
import { PosAndPlacement } from "@components/Tooltip/lib/types/popover";
import { Placement } from "@components/Tooltip/lib/types/tooltip";
import { debounce } from "@components/Tooltip/lib/debounce";
import { useDOM } from "@src/utils";
import {
  TRANSITION_CLASSNAMES,
  TransitionClassValue
} from "@components/Tooltip/lib/constants";

interface PositionOption {
  visible: boolean;
  targetEl: HTMLElement | null;
  toolTipEl: HTMLElement | null;
  style: React.CSSProperties;
  placement: Placement;
  showDelay: number;
  appendTarget?: HTMLElement;
}

interface PosState {
  value: PosAndPlacement;
}

interface PosAction {
  type: "update";
  updater: () => PosAndPlacement; // update in time
}

const posReducer: Reducer<PosState, PosAction> = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        value: action.updater()
      };
    default:
      return state;
  }
};

// update position of PopOver
export const usePos = (option: PositionOption): PosAndPlacement => {
  const {
    targetEl,
    toolTipEl,
    style,
    placement,
    showDelay,
    visible,
    appendTarget
  } = option;
  const xPlacement = useXPlacementAttr(placement);
  const [, secondDirection] = xPlacement.split("-");
  const getPosAndPlacement = useCallback((): PosAndPlacement => {
    if (targetEl && toolTipEl) {
      const { top, left, direction } = calcPopoverPosition(
        targetEl,
        toolTipEl,
        placement
      );
      return {
        top,
        left,
        placement: `${direction}-${secondDirection}` as Placement
      };
    }
    return {
      top: Infinity,
      left: Infinity,
      placement: xPlacement as Placement
    };
  }, [targetEl, toolTipEl, placement, secondDirection]);

  const [state, dispatch] = useReducer(posReducer, {
    value: getPosAndPlacement()
  });
  // avoid constant change from `style`
  const serializedStyle = JSON.stringify(style);
  useEffect(() => {
    // only update position when it is visible
    if (visible && appendTarget) {
      dispatch({
        type: "update",
        updater: getPosAndPlacement
      });
    }
  }, [serializedStyle, visible, getPosAndPlacement, appendTarget]);
  const sideEffectTarget = useDOM();
  const updater = useCallback(() => {
    if (visible) {
      dispatch({
        type: "update",
        updater: getPosAndPlacement
      });
    }
  }, [getPosAndPlacement, visible]);
  const debouncedUpdatePos = useMemo(() => debounce(updater, showDelay), [
    updater,
    showDelay
  ]);
  useMonoEffect({
    eventName: "resize",
    target: sideEffectTarget,
    uid: "tooltipResize",
    effects: debouncedUpdatePos,
    deps: [debouncedUpdatePos]
  });

  useMonoEffect({
    eventName: "scroll",
    target: sideEffectTarget,
    uid: "tooltipScroll",
    effects: debouncedUpdatePos,
    deps: [debouncedUpdatePos]
  });
  return state.value;
};
// sole purpose to add dat arrow
export const useXPlacementAttr = (placement: Placement): string => {
  const [mainPlacementKey, secondPlacementKey = "center"] = placement.split(
    "-"
  );
  return `${mainPlacementKey}-${secondPlacementKey}`;
};

export const useTransition = () => {
  const [transitionClassName, setTransitionClassName] = useState<
    null | TransitionClassValue | TransitionClassValue[]
  >(null);
  useEffect(() => {
    switch (transitionClassName) {
      case TRANSITION_CLASSNAMES.enter:
        setTransitionClassName(TRANSITION_CLASSNAMES.enterActive);
        break;
      case TRANSITION_CLASSNAMES.enterActive:
        setTransitionClassName([
          TRANSITION_CLASSNAMES.enterActive,
          TRANSITION_CLASSNAMES.enterDone
        ]);
        break;
      case TRANSITION_CLASSNAMES.exit:
        setTransitionClassName(TRANSITION_CLASSNAMES.exitActive);
        break;
      case TRANSITION_CLASSNAMES.exitActive:
        setTransitionClassName([
          TRANSITION_CLASSNAMES.exitActive,
          TRANSITION_CLASSNAMES.exitDone
        ]);
        break;
      default:
    }
  }, [transitionClassName]);
  return [transitionClassName, setTransitionClassName] as const;
};
