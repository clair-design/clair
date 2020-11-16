import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const types = [
  "primary",
  "default",
  "warning",
  "danger",
  "success",
  "ghost"
] as const;
export type Type = typeof types[number];
const PType = PropTypes.oneOf([...types]);

const sizes = ["large", "normal", "small"] as const;
export type Size = typeof sizes[number];
const PSize = PropTypes.oneOf([...sizes]);

const htmlTypes = ["button", "reset", "submit"] as const;
export type HtmlType = typeof htmlTypes[number];
const PHtmlType = PropTypes.oneOf([...htmlTypes]);

// handle "detail" property of custom event
type ButtonEvent = React.MouseEvent<HTMLButtonElement> &
  Partial<Pick<CustomEvent, "detail">>;
type EventHandler = React.EventHandler<ButtonEvent>;

export interface ButtonProps {
  size?: Size;
  type?: Type;
  htmlType?: HtmlType;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: EventHandler;
  onSubmit?: EventHandler;
  onReset?: EventHandler;
  forwardRef?: React.RefObject<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = props => {
  const {
    size = "normal",
    type = "default",
    htmlType = "button",
    disabled = false,
    loading = false,
    block = false,
    children,
    forwardRef,
    className,
    ...rest
  } = props;

  const className2Use: string = classNames("c-button", className, {
    [`c-button--${type}`]: types.some(t => t === type),
    [`c-button--${size}`]: sizes.some(s => s === size),
    "c-button--block": block,
    "c-button--loading": loading
  });
  return (
    <button
      ref={forwardRef}
      className={className2Use}
      disabled={disabled}
      type={htmlType}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  size: PSize,
  type: PType,
  htmlType: PHtmlType,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  children: PropTypes.node,
  forwardRef: PropTypes.shape({
    current: PropTypes.any
  })
} as PropTypes.ValidationMap<ButtonProps>;

Button.displayName = "Button";
