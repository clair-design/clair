import { useState, useEffect, useRef } from "react";

const INTERVAL = 100;
const DELAY = 300;

export default function useLongPress(callback: Function) {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    if (isLongPressing) {
      timer.current = setTimeout(callback, INTERVAL);
    } else {
      clearTimeout(timer.current);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [callback, isLongPressing]);

  const timerDelay = useRef<number>();
  const start = (e: React.MouseEvent | React.TouchEvent) => {
    // 取消当前按钮的focus行为, 避免input focus改变造成光标闪动
    e.preventDefault();
    const handler: Function = () => setIsLongPressing(true);
    timerDelay.current = setTimeout(handler, DELAY);
  };
  const stop = () => {
    clearTimeout(timerDelay.current);
    setIsLongPressing(false);
  };

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop
  };
}
