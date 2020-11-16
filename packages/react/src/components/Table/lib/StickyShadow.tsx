import React from "react";
import classnames from "classnames";

interface StickyShadowPropTypes {
  offset: number;
  direction?: "left" | "right" | "top";
  height?: string | number;
}

function StickyShadow(props: StickyShadowPropTypes) {
  const { offset, direction = "left", height = "100%" } = props;
  const divClassNames = classnames({
    "c-table__shadow--sticky-left": direction === "left",
    "c-table__shadow--sticky-right": direction === "right",
    "c-table__shadow--sticky-top": direction === "top"
  });
  const style: React.CSSProperties = {
    top: 0,
    [direction]: offset
  };
  if (direction !== "top") {
    style.height = height;
  }
  return <div style={style} className={divClassNames} />;
}

export default StickyShadow;
