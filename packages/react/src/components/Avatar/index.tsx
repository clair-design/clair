import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { IconUser } from "@components/Icon";

const sizes = ["small", "normal", "large"] as const;
const shapes = ["circle", "square"] as const;

type Size = typeof sizes[number];
type Shape = typeof shapes[number];

type AvatarProps = {
  size?: Size;
  shape?: Shape;
  color?: string;
  backgroundColor?: string;
  src?: string;
  children?: ReactNode;
} & ClassNameAndStyle &
  HTMLAttributes<HTMLDivElement>;

export const Avatar: FC<AvatarProps> = props => {
  const {
    size = "normal",
    shape = "circle",
    color,
    backgroundColor,
    src,
    children,
    className,
    style = {},
    ...rest
  } = props;
  const className2Use: string = classNames("c-avatar", className, {
    [`c-avatar--${size}`]: sizes.includes(size),
    [`c-avatar--${shape}`]: shapes.includes(shape)
  });
  const style2Use: CSSProperties = {
    color,
    backgroundColor,
    ...style
  };
  let content = children || <IconUser />;
  if (src) {
    content = <img src={src} alt="头像图片" />;
  }
  return (
    <div
      className={className2Use}
      style={style2Use}
      role="img"
      aria-label="头像"
      {...rest}
    >
      {content}
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf([...sizes]),
  shape: PropTypes.oneOf([...shapes]),
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  src: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Avatar.displayName = "Avatar";
