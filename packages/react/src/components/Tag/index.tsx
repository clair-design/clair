import React, { forwardRef, HTMLAttributes, useState, MouseEvent } from "react";
import { IconClear } from "@components/Icon";
import classNames from "classnames";
import PropTypes from "prop-types";

const sizes = ["large", "normal", "small"] as const;
export type Size = typeof sizes[number];
const PSize = PropTypes.oneOf([...sizes]);

type Text = React.ReactNode;
const PText = PropTypes.node;

const colors = [
  "blue",
  "green",
  "orange",
  "red",
  "purple",
  "grey",
  "cyan",
  "magenta"
] as const;
export type Color = typeof colors[number];

export function isColorValid(color: string) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: Size;
  color?: Color;
  closable?: boolean;
  onClose?: Function;
  visible?: boolean;
  style?: React.CSSProperties;
  children?: Text;
}

type UseVisibleProps = Pick<TagProps, "onClose" | "visible">;

const useVisible = (props: UseVisibleProps) => {
  const { visible, onClose: onCloseFromProps } = props;
  const isControlled = typeof visible === "boolean";
  const [ownVisible, updateOwnVisible] = useState(true);
  const visible2Use: boolean = isControlled ? (visible as boolean) : ownVisible;
  const onClose = (e: MouseEvent) => {
    if (!isControlled) {
      updateOwnVisible(false);
    }
    if (typeof onCloseFromProps === "function") {
      onCloseFromProps(e);
    }
  };
  return {
    visible: visible2Use,
    onClose
  };
};

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    className,
    color,
    size = "normal",
    closable = false,
    style,
    children,
    onClose,
    visible,
    ...rest
  } = props;
  const { visible: visible2Use, onClose: onClose2Use } = useVisible({
    visible,
    onClose
  });

  const cClassName = classNames(className, "c-tag", {
    "c-tag-closable": closable,
    [`c-tag--${color}`]: color && colors.includes(color),
    [`c-tag--${size}`]: size && sizes.includes(size)
  });

  const cStyle =
    color && isColorValid(color)
      ? {
          color,
          backgroundColor: "#fff",
          border: "1px solid",
          ...style
        }
      : style;

  if (!visible2Use) {
    return null;
  }

  return (
    <div className={cClassName} style={cStyle} {...rest} ref={ref}>
      <span className="c-tag__label">{children}</span>
      {closable ? (
        <IconClear
          className="c-icon--close-tag"
          role="button"
          onClick={onClose2Use}
        />
      ) : null}
    </div>
  );
});

Tag.propTypes = {
  size: PSize,
  children: PText,
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  visible: PropTypes.bool
} as PropTypes.ValidationMap<TagProps>;

Tag.displayName = "Tag";
