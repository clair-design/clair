import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { getStatusIcon } from "../../Icon";

export const types = ["success", "warning", "info", "error"] as const;
export type Type = typeof types[number];
const PType = PropTypes.oneOf([...types]);

export interface MessageProps {
  type?: Type;
  duration?: number;
  children: React.ReactNode;
  top?: React.CSSProperties["top"];
  zIndex?: React.CSSProperties["zIndex"];
  onClose?: () => void;
}

const DEFAULT_DURATION: number = 3000;
export const TRANSITION_DURATION: number = 500;

export const Message: React.FC<MessageProps> = props => {
  const {
    type = "info",
    duration = DEFAULT_DURATION,
    top,
    children,
    onClose
  } = props;
  const iconType: Type = types.includes(type) ? type : "info";
  const timerId = useRef<number>(0);
  const [visible, setVisible] = useState(true);
  const [timerPaused, setTimerPaused] = useState(false);
  const hide = () => setVisible(() => false);
  useEffect(() => {
    window.clearTimeout(timerId.current);
    if (!timerPaused) {
      timerId.current = window.setTimeout(hide, duration);
    }
    return () => {
      window.clearTimeout(timerId.current);
    };
  }, [duration, timerPaused]);
  const onExited = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };
  const onMouseEnterHandler = () => {
    setTimerPaused(true);
  };
  const onMouseLeaveHandler = () => {
    setTimerPaused(false);
  };
  return (
    <CSSTransition
      timeout={TRANSITION_DURATION}
      in={visible}
      appear={true}
      onExited={onExited}
      unmountOnExit
      classNames={{
        appearActive: "c-message-enter-active",
        enterActive: "c-message-enter-active",
        exitActive: "c-message-leave-active"
      }}
    >
      <div
        className="c-message"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        style={{ top }}
      >
        {getStatusIcon(iconType)}
        <div className="c-message__content">{children}</div>
      </div>
    </CSSTransition>
  );
};

Message.propTypes = {
  type: PType,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  top: PropTypes.string,
  children: PropTypes.node.isRequired
};
