import React, {
  CSSProperties,
  RefObject,
  useContext,
  useEffect,
  useState
} from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SharedDOMContext, useDOM, useZIndex, __TEST__ } from "@src/utils";
import { usePos, useTransition } from "@components/Tooltip/lib/hooks/popover";
import { PopOverProps } from "@components/Tooltip/lib/types/popover";
import {
  PAppendTarget,
  PPlacement
} from "@components/Tooltip/lib/types/tooltip";
import { TRANSITION_CLASSNAMES } from "@components/Tooltip/lib/constants";

export const PopOver: React.FC<PopOverProps> = React.forwardRef<
  HTMLDivElement,
  PopOverProps
>((props, ref) => {
  const {
    visible = false,
    style = {},
    className,
    role = "tooltip",
    placement = "top",
    showDelay,
    appendTarget,
    children,
    ...rest
  } = props;
  // where to portal/inject the component
  const body = useDOM(() => appendTarget ?? document.body);
  const { dom: childrenTarget } = useContext(SharedDOMContext);
  const zIndex = useZIndex({
    visible
  });
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    outline: "none", // TODO: keep? move to CSS?
    zIndex
  };
  const posOption = {
    visible,
    style,
    showDelay,
    appendTarget: body as HTMLElement,
    targetEl: childrenTarget,
    toolTipEl: (ref as RefObject<HTMLDivElement>)?.current,
    placement
  };
  const { top, left, placement: normalizedPlacement } = usePos(posOption);
  const hasPinnedPos: boolean = top !== Infinity && left !== Infinity;
  // only show PopOver after its position has been calculated
  // so it won't be shown at top-left corner for the first glance
  const toShow: boolean = visible && hasPinnedPos;
  let positionStyle: CSSProperties = {};
  if (hasPinnedPos) {
    positionStyle = { top, left };
  }
  const [transitionClassName, setTransitionClassName] = useTransition();
  const [display, setDisplay] = useState(toShow ? "block" : "none");
  // @test-only keep test intact
  // hide panel instantly
  let displayValue = display;
  if (__TEST__ && !toShow) {
    displayValue = "none";
  }
  // style from user takes highest priority
  const style2Use: React.CSSProperties = {
    ...positionStyle,
    ...containerStyle,
    display: displayValue,
    ...style
  };

  useEffect(() => {
    const transitionEntering = () => {
      setTransitionClassName(TRANSITION_CLASSNAMES.enter);
    };

    const transitionLeaving = () => {
      setTransitionClassName(TRANSITION_CLASSNAMES.exit);
    };
    if (toShow) {
      setDisplay("block");
      transitionEntering();
    } else if (hasPinnedPos) {
      transitionLeaving();
    }
  }, [toShow, hasPinnedPos, setTransitionClassName]);

  const onTransitionEnd = () => {
    if (!toShow) {
      setDisplay("none");
    }
    setTransitionClassName(null);
  };
  const result = (
    <div
      style={style2Use}
      role={role}
      aria-hidden={!visible}
      className={classNames("c-popover", className, transitionClassName)}
      x-placement={normalizedPlacement}
      onTransitionEnd={onTransitionEnd}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
  // ssr
  // render in place with `display: none`
  // useful for components to collect data within Popover
  // especially when render order matters
  if (!body) {
    return result;
  }
  return createPortal(result, body as HTMLElement);
});

PopOver.propTypes = {
  visible: PropTypes.bool.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  placement: PPlacement,
  role: PropTypes.string,
  showDelay: PropTypes.number.isRequired,
  appendTarget: PAppendTarget,
  children: PropTypes.node
} as PropTypes.ValidationMap<PopOverProps>;

PopOver.displayName = "PopOver";
