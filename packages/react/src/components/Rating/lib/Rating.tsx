import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { isFunction } from "lodash-es";
import PropTypes from "prop-types";
import { IconHeart, IconStarFilled } from "@components/Icon";
import { isNil } from "@clair/helpers";

const defaultCount = 5;
const defaultFontSize = 16;
const defaultColor = "#EAEAEC";
const activeColor = "#FFB409";
const activeHeartColor = "#FF6860";
const keys = {
  ENTER: "Enter",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  SPACE: " ",
  TAB: "Tab"
};
const types = ["star", "heart", "custom"] as const;
const hundred = 100;

type InteractEvent = React.MouseEvent | React.KeyboardEvent | React.FocusEvent;
type CustomEvent = CFormEvent<number>;
type Handler = (e: CustomEvent) => void;

export interface RatingProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  type?: typeof types[number];
  color?: string;
  size?: number;
  readonly?: boolean;
  customChar?: React.ReactNode;
  onChange?: Handler;
  onActiveChange?: Handler;
}

export const Rating: React.FC<RatingProps> = props => {
  const {
    value,
    defaultValue = 0,
    count = defaultCount,
    type = "star",
    color = type === "heart" ? activeHeartColor : activeColor,
    size = defaultFontSize,
    readonly,
    customChar,
    onChange,
    onActiveChange
  } = props;

  const isControlled = !isNil(value);
  const initialValue = (isControlled ? value : defaultValue) as number;

  const [activeIndex, setActiveIndex] = useState(initialValue);
  const [actualValue, setActualValue] = useState(initialValue);

  // 更新activeIndex, 若 from change, 则同时更新actualValue
  const updateState = (index: number, isChange: boolean = false) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
    // from change
    if (index !== actualValue && isChange) {
      setActualValue(index);
    }
  };

  useEffect(() => {
    if (!isControlled) return;
    if (typeof value !== "number") return;

    // 受控, 根据外部修改的value更新
    setActiveIndex(() => value);
    setActualValue(() => value);
  }, [isControlled, value, setActiveIndex, setActualValue]);

  const handleChange = (
    index: number,
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    if (readonly) return;

    if (isFunction(onChange)) {
      onChange({ ...e, target: { value: index } });
    }
    // 非受控, 内部维护变量值
    if (!isControlled) {
      updateState(index, true);
    }
  };
  // mouseenter or mouseleave or keyboard
  const handleInteract = (index: number, e: InteractEvent) => {
    if (readonly) return;

    if (isFunction(onActiveChange) && index !== activeIndex) {
      onActiveChange({ ...e, target: { value: index } });
    }
    updateState(index);
  };
  const handleKeyBoard = (e: React.KeyboardEvent) => {
    const { key } = e;

    if (!Object.values(keys).includes(key)) return;

    // blur
    if (key === keys.TAB) {
      handleInteract(actualValue, e);
      return;
    }

    if (key === keys.ENTER || key === keys.SPACE) {
      e.preventDefault();
      if (activeIndex === 0) return;
      handleChange(activeIndex, e);
      return;
    }

    let delta = 0;
    if (key === keys.RIGHT) {
      delta = 1;
    } else if (key === keys.LEFT) {
      delta = -1;
    }
    const index = activeIndex + delta;
    if (index > count || index < 0) return;

    handleInteract(index, e);
  };

  const containerClass: string = classNames({
    "c-rating": true,
    "c-rating--readonly": readonly
  });

  const unitClassNames: string = classNames({
    "c-rating__unit": true,
    [`c-rating__unit--${type}`]: types.some(t => t === type)
  });

  const units: JSX.Element[] = [];
  for (let i = 1; i <= count; i++) {
    const isActive = i <= activeIndex;

    // 半星, readonly & value 为小数
    const isPart =
      readonly &&
      i > activeIndex &&
      i < activeIndex + 1 &&
      !Number.isInteger(activeIndex);

    const unitStyles: React.CSSProperties = {
      fontSize: `${size}px`,
      color: isActive ? color : defaultColor
    };

    const char =
      customChar || (type === "star" ? <IconStarFilled /> : <IconHeart />);

    units.push(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className={unitClassNames}
        key={i}
        role="radio"
        tabIndex={-1}
        aria-checked={isActive}
        style={unitStyles}
        onClick={e => {
          handleChange(i, e);
        }}
        onMouseEnter={e => {
          handleInteract(i, e);
        }}
      >
        <span>{char}</span>
        {isPart && (
          <span
            className="c-rating__part"
            style={{
              width: `${(activeIndex % 1) * hundred}%`,
              color
            }}
          >
            {char}
          </span>
        )}
      </div>
    );
  }
  return (
    <div
      role="radiogroup"
      tabIndex={readonly ? -1 : 0}
      className={containerClass}
      onMouseLeave={e => {
        handleInteract(actualValue, e);
      }}
      onKeyDown={handleKeyBoard}
    >
      {units}
    </div>
  );
};

Rating.propTypes = {
  count: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  type: PropTypes.oneOf([...types]),
  color: PropTypes.string,
  size: PropTypes.number,
  readonly: PropTypes.bool,
  customChar: PropTypes.node,
  onChange: PropTypes.func,
  onActiveChange: PropTypes.func
};
