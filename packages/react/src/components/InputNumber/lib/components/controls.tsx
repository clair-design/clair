/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import classNames from "classnames";
import { isNil } from "lodash-es";
import {
  IconArrowDown,
  IconArrowUp,
  IconPlus,
  IconMinus
} from "@components/Icon";
import useLongPress from "../hooks/useLongPress";
import { ControlProps, ControlPropsTypes } from "../types";

export const Controls: React.FC<ControlProps> = props => {
  const { actualValue, min, max, controlPosition, operate, disabled } = props;

  const decreaseDisabled =
    disabled || (!isNil(actualValue) && actualValue <= min);
  const increaseDisabled =
    disabled || (!isNil(actualValue) && actualValue >= max);

  const decrease = () => operate(-1);
  const increase = () => operate(1);

  const decreaseClassNames = classNames(
    "c-input-number__controls",
    "c-input-number__decrease"
  );

  const increaseClassNames = classNames(
    "c-input-number__controls",
    "c-input-number__increase"
  );

  return (
    <React.Fragment>
      <span
        className={decreaseClassNames}
        user-select="none"
        tabIndex={-1}
        role="button"
        aria-label="decrease"
        aria-disabled={decreaseDisabled ? "true" : "false"}
        onClick={decrease}
        {...useLongPress(decrease)}
      >
        {controlPosition === "left-right" ? <IconMinus /> : <IconArrowDown />}
      </span>
      <span
        className={increaseClassNames}
        user-select="none"
        tabIndex={-1}
        role="button"
        aria-label="increase"
        aria-disabled={increaseDisabled ? "true" : "false"}
        onClick={increase}
        {...useLongPress(increase)}
      >
        {controlPosition === "left-right" ? <IconPlus /> : <IconArrowUp />}
      </span>
    </React.Fragment>
  );
};

Controls.propTypes = ControlPropsTypes;
