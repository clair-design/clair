import React, { useRef } from "react";
import { IconContainer, IconProps, IconPropTypes } from "./Container";
import { useCircleREffect } from "./useCircleREffect";

export const IconLineAndDot: React.FC<IconProps> = props => {
  const { className, style, forwardRef } = props;
  const ownRef = useRef<HTMLElement>(null);
  const ref2Use = forwardRef || ownRef;
  useCircleREffect({
    ref: ref2Use,
    deps: [className, style]
  });

  return <IconContainer {...props} forwardRef={ref2Use} />;
};

IconLineAndDot.propTypes = IconPropTypes;
IconLineAndDot.displayName = "IconLineAndDot";
