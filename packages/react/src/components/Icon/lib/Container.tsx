import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useStrokeWidthEffect } from "./useStrokeWidthEffect";

export type IconCommonProps = React.HTMLAttributes<HTMLElement>;

export interface IconProps extends IconCommonProps {
  template?: string;
  forwardRef?: React.RefObject<HTMLElement>;
  baseStrokeWidth?: number;
  filledOnly?: boolean;
}

export const IconContainer: React.FC<IconProps> = props => {
  const {
    template = "",
    forwardRef,
    filledOnly,
    className,
    baseStrokeWidth = 1,
    ...rest
  } = props;
  const ownRef = useRef<HTMLElement>(null);
  const ref2Use = forwardRef || ownRef;
  useStrokeWidthEffect({
    ref: ref2Use,
    baseStrokeWidth,
    filledOnly,
    deps: [className, JSON.stringify(props.style), filledOnly, baseStrokeWidth]
  });
  return (
    <i
      {...rest}
      className={classNames("c-icon--svg", className)}
      dangerouslySetInnerHTML={{ __html: template }}
      ref={ref2Use}
    />
  );
};

export const IconPropTypes = {
  template: PropTypes.string,
  forwardRef: PropTypes.object,
  filledOnly: PropTypes.bool,
  baseStrokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
} as PropTypes.ValidationMap<IconProps>;

IconContainer.propTypes = IconPropTypes;

IconContainer.displayName = "IconContainer";
