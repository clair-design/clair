import classNames from "classnames";
import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AutoIncreasingCounter } from "@clair/helpers";
import { CSSTransition } from "react-transition-group";
import Indicator from "./Indicator";

const autoIncrCounter = new AutoIncreasingCounter();

const sizes = ["large", "normal", "small"] as const;
export type Size = typeof sizes[number];
export const PSize = PropTypes.oneOf([...sizes]);

type Text = React.ReactNode;
export const PText = PropTypes.node;

const PElement = PropTypes.oneOfType([PropTypes.element, PropTypes.object]);

export const hostClass = [
  "c-loading-container--relative",
  "c-loading-container--hidden"
];

export interface LoadingProps
  extends Partial<DefaultLoadingProps & ClassNameAndStyle> {
  text?: Text;
  children?: Text;
}

export interface DefaultLoadingProps {
  loading?: boolean;
  size?: Size;
  fullscreen?: boolean;
  indicator?: Text;
}

interface LoadingCoreProps extends Partial<LoadingProps> {
  mountNode: Element | null;
}

export const LoadingCore: React.FC<LoadingCoreProps> = props => {
  const {
    loading,
    text,
    size,
    indicator,
    style,
    className,
    mountNode,
    fullscreen
  } = props;

  const classes = classNames(
    "c-loading-mask",
    className,
    fullscreen ? "c-loading-mask--fullscreen" : null
  );
  const sizeClass = classNames("c-loading-spin", `c-loading-spin--${size}`);
  const styles = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: 0,
    left: 0,
    ...style
  };

  const textIdRef = useRef(`c-loading-spin__text${autoIncrCounter.next()}`);
  const [textId, updateTextId] = useState<string | undefined>(
    textIdRef.current
  );

  useEffect(() => {
    updateTextId(() => {
      return text ? textIdRef.current : undefined;
    });
  }, [text]);

  const ariaAttr =
    text !== undefined
      ? { "aria-labelledby": textId }
      : { "aria-label": "加载中" };

  const loadingNode: React.ReactNode = (
    <div className={classes} style={styles} {...ariaAttr}>
      <div className={sizeClass}>
        <Indicator>{indicator}</Indicator>
        {text ? (
          <div className="c-loading-spin__text" id={textId}>
            {text}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (!mountNode) return null;

  return ReactDOM.createPortal(
    <CSSTransition appear in={loading} timeout={0}>
      {loadingNode}
    </CSSTransition>,
    mountNode
  );
};
LoadingCore.propTypes = {
  loading: PropTypes.bool,
  text: PText,
  size: PSize,
  indicator: PText,
  className: PropTypes.string,
  style: PropTypes.object,
  mountNode: PElement.isRequired,
  fullscreen: PropTypes.bool
} as PropTypes.ValidationMap<LoadingProps>;

LoadingCore.displayName = "LoadingCore";
