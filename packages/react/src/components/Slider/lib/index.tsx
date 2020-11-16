import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState
} from "react";
import classNames from "classnames";
import { isFunction, throttle } from "lodash-es";
import PropTypes from "prop-types";
import { Tooltip } from "@components/Tooltip";
import { Trigger } from "@components/Tooltip/lib/types/tooltip";
import {
  SliderTypes,
  normalizeStartAndEnd,
  roundValue,
  getSizeInfo,
  formatTooltip
} from "./util";
import { useSliderValue } from "./hooks/sliderValue";

const keys = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown"
};
const defaultTrigger: Trigger = ["click", "hover", "focus"];
const mousemoveTrigger: Trigger = ["focus"];
const Types = ["horizontal", "vertical"] as const;
const HUNDRED = 100;
const TWO = 2;
const INTERVAL = 1000 / 60;

export interface SliderProps {
  mode?: typeof Types[number];
  step?: number;
  showStepMark?: boolean;
  value?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  readonly?: boolean;
  disabled?: boolean;
  tipFormat?: Function;
  onChange?: (e: CFormEvent<number | number[]>) => void;
}

export const Slider: React.FC<SliderProps> = props => {
  const {
    mode = "horizontal",
    value,
    defaultValue,
    step = 1,
    showStepMark,
    min = 0,
    max = HUNDRED,
    readonly,
    disabled,
    tipFormat = (input: number) => input,
    onChange
  } = props;

  const { start, end } = normalizeStartAndEnd({
    min,
    max,
    defaultValue,
    value,
    step
  });

  const [state, updateState] = useSliderValue({
    start,
    end,
    value
  });
  const [tipTrigger, setTipTrigger] = useState(defaultTrigger);
  const isRange = Array.isArray(value || defaultValue);
  const isHorizontal = mode === "horizontal";
  const {
    toolTipDimension,
    clientPosDimension,
    thumbPosDimension,
    sizeDimension,
    containerSizeDimension
  } = getSizeInfo(mode);

  // slider dom节点
  const sliderRef = useRef<HTMLDivElement>(null);
  const movedButtonIndexRef = useRef<number>(0);

  const valueRange = max - min;
  const stepPercentage = (step / valueRange) * HUNDRED;

  const handleChange = useCallback(
    (type: SliderTypes, value: number) => {
      if (value > max || value < min) {
        return;
      }

      updateState(type, value);
      document.body.dispatchEvent(
        new Event("resize", {
          bubbles: true
        })
      );

      if (!isFunction(onChange)) {
        return;
      }

      let { start, end } = state;
      if (type === "start") {
        start = value;
      } else {
        end = value;
      }
      if (start > end) {
        [start, end] = [end, start];
      }
      onChange?.({ target: { value: isRange ? [start, end] : end } });
    },
    [isRange, max, min, onChange, updateState, state]
  );

  // keyboard event
  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      const { key } = e;

      if (!Object.values(keys).includes(key) || readonly) return;

      e.preventDefault();

      const isTargetEndButton = index === 1;
      const stateChanged = isTargetEndButton || !isRange ? "end" : "start";
      const sign = key === keys.RIGHT || key === keys.UP ? 1 : -1;
      movedButtonIndexRef.current = index;

      handleChange(stateChanged, state[stateChanged] + sign * step);
    },
    [handleChange, isRange, readonly, state, step]
  );

  // 根据offset计算移动的距离在整个slider上所占百分比
  const getMovedPercentage = useCallback(
    (offsetOrigin: number) => {
      const sliderSize = sliderRef.current?.[containerSizeDimension] as number;
      return offsetOrigin / sliderSize;
    },
    [containerSizeDimension]
  );

  const getCurrentThumbElement = () => {
    return sliderRef.current?.querySelectorAll(".c-slider__thumb")?.[
      movedButtonIndexRef.current
    ] as HTMLElement;
  };

  // 根据button移动的距离变化value值
  const setPosition = useCallback(
    (offset: number) => {
      const target = getCurrentThumbElement();
      const size = target?.[isHorizontal ? "offsetHeight" : "offsetWidth"];
      const thumbPosition =
        target.getBoundingClientRect()?.[isHorizontal ? "x" : "y"] + size / TWO;
      const offsetOrigin = offset - thumbPosition;

      // 水平为正, 垂直为负, 因为水平是向右移动表示增加, 而垂直的是向上表示增加, 向上的话move的距离为负值
      const delta = isHorizontal ? 1 : -1;
      // 将移动的像素值转换成所占百分比
      const movedPercentage =
        delta * getMovedPercentage(offsetOrigin) * HUNDRED;
      // 判断修改的是哪个值
      const stateChanged =
        movedButtonIndexRef.current || !isRange ? "end" : "start";
      // 移动之后的value值, 鼠标移动过程中, 每次变化的值为一个step
      const normalizedClickedValue =
        state[stateChanged] +
        step * Math.round(movedPercentage / stepPercentage);

      // 移动距离小于step的一半, 则不进行数值变化
      if (Math.abs(movedPercentage) < stepPercentage / TWO) return;

      handleChange(stateChanged, normalizedClickedValue);
    },
    [
      getMovedPercentage,
      handleChange,
      isHorizontal,
      isRange,
      state,
      step,
      stepPercentage
    ]
  );
  const setPositionRef = useRef<(offsetOrigin: number) => void>(setPosition);
  useEffect(() => {
    setPositionRef.current = setPosition;
  }, [setPosition]);

  // 鼠标事件
  const throttleMouseMoveFn = useMemo(() => {
    return throttle(
      (e: React.MouseEvent) => {
        setPositionRef.current?.(e[clientPosDimension]);
      },
      INTERVAL,
      { trailing: true }
    );
  }, [clientPosDimension]);

  const handleMouseUp = useCallback(() => {
    setTipTrigger(defaultTrigger);
    window.removeEventListener(
      "mousemove",
      (throttleMouseMoveFn as unknown) as EventListener
    );
    window.removeEventListener(
      "mouseup",
      (handleMouseUp as unknown) as EventListener
    );
  }, [throttleMouseMoveFn]);
  const handleMouseDown = useCallback(
    (index: number) => {
      if (readonly || disabled) return;

      movedButtonIndexRef.current = index;
      setTipTrigger(mousemoveTrigger);
      window.addEventListener(
        "mousemove",
        (throttleMouseMoveFn as unknown) as EventListener
      );
      window.addEventListener(
        "mouseup",
        (handleMouseUp as unknown) as EventListener
      );
    },
    [disabled, handleMouseUp, readonly, throttleMouseMoveFn]
  );

  const effectQueue = useRef<Function[]>([]);
  useEffect(() => {
    if (effectQueue.current.length) {
      effectQueue.current.forEach(fn => fn());
      effectQueue.current = [];
    }
  });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (readonly || disabled) return;

      // 获取click位置的位置
      const offsetOrigin = sliderRef.current?.getBoundingClientRect()?.[
        thumbPosDimension
      ] as number;

      // 计算click位置的值
      const movedOffset = Math.abs(offsetOrigin - e[clientPosDimension]);
      const clickedValue = min + valueRange * getMovedPercentage(movedOffset);
      const normalizedClickedValue = roundValue(min, step, clickedValue);
      // 计算click之后的值与start/end的间距, 取距离较小的点做移动
      const startDelta = Math.abs(state.start - normalizedClickedValue);
      const endDelta = Math.abs(state.end - normalizedClickedValue);
      // 若movedValue与start/end相同, 则表示无change
      if (!startDelta || !endDelta) return;

      handleChange(
        startDelta <= endDelta && isRange ? "start" : "end",
        normalizedClickedValue
      );
      movedButtonIndexRef.current = startDelta > endDelta && isRange ? 1 : 0;

      effectQueue.current.push(() => getCurrentThumbElement()?.focus());
    },
    [
      clientPosDimension,
      disabled,
      getMovedPercentage,
      handleChange,
      isRange,
      min,
      readonly,
      state.end,
      state.start,
      step,
      thumbPosDimension,
      valueRange
    ]
  );

  const containerClass: string = classNames({
    "c-slider": true,
    "c-slider--disabled": disabled,
    "c-slider--readonly": readonly,
    "c-slider--vertical": mode === "vertical"
  });

  let mark;
  // 刻度点个数
  const markCount = Math.floor(valueRange / step) + 1;
  const stepMarks: JSX.Element[] = [];
  // 生成刻度标记
  if (showStepMark) {
    // 判断当前mark是否为active
    const isMarkActive = (index: number) => {
      const val = min + step * index;
      return (
        val >= Math.min(state.start, state.end) &&
        val <= Math.max(state.start, state.end)
      );
    };
    for (let i = 0; i < markCount; i++) {
      const markClass: string = classNames({
        "c-slider__step-mark": true,
        "c-slider__step-mark--active": isMarkActive(i)
      });
      stepMarks.push(
        <div
          className={markClass}
          style={{ [thumbPosDimension]: `${i * stepPercentage}%` }}
          key={`mark${i}`}
        />
      );
    }
    mark = <div className="c-slider__step-marks">{stepMarks}</div>;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      tabIndex={-1}
      className={containerClass}
      ref={sliderRef}
      onMouseDown={handleClick}
    >
      <div className="c-slider__background-bar">
        {mark}
        <div
          className="c-slider__progress-bar"
          style={{
            [sizeDimension]: `${
              (Math.abs(state.end - state.start) / valueRange) * HUNDRED
            }%`,
            [thumbPosDimension]: `${
              ((Math.min(state.start, state.end) - min) / valueRange) * HUNDRED
            }%`
          }}
        ></div>
        {(isRange ? ["", ""] : [""]).map((_, index) => {
          const val = index || !isRange ? state.end : state.start;
          return (
            <Tooltip
              key={index}
              trigger={tipTrigger}
              placement={toolTipDimension}
              content={formatTooltip(tipFormat)(val)}
            >
              <button
                className="c-slider__thumb"
                style={{
                  [thumbPosDimension]: `${
                    ((val - min) / valueRange) * HUNDRED
                  }%`
                }}
                type="button"
                disabled={disabled}
                role="slider"
                aria-valuemin={min}
                aria-valuenow={val}
                aria-valuemax={max}
                aria-orientation={mode}
                onKeyDown={e => {
                  handleKeyDown(index, e);
                }}
                onMouseDown={() => {
                  handleMouseDown(index);
                }}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

Slider.propTypes = {
  mode: PropTypes.oneOf([...Types]),
  step: PropTypes.number,
  showStepMark: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  min: PropTypes.number,
  max: PropTypes.number,
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  tipFormat: PropTypes.func,
  onChange: PropTypes.func
};
