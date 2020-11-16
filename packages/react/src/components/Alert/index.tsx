import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { getStatusIcon, IconCloseBackwards } from "@components/Icon";

const types = ["success", "warning", "info", "error"] as const;
export type Type = typeof types[number];
const PType = PropTypes.oneOf([...types]);

type Text = React.ReactNode;
const PText = PropTypes.node;

export interface AlertProps {
  type?: Type;
  title?: Text;
  children: Text;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: React.MouseEventHandler;
}

const AlertTitle: React.FC<{ children: Text }> = ({ children }) => (
  <div className="c-alert__title">{children}</div>
);

AlertTitle.propTypes = {
  children: PText
};

export const Alert: React.FC<AlertProps> = props => {
  const {
    type = "info",
    title,
    showIcon = true,
    closable = true,
    children,
    onClose
  } = props;

  const [closed, setClosed] = useState(false);

  const onCloseHandler = (e: React.MouseEvent) => {
    setClosed(true);
    if (typeof onClose === "function") {
      onClose(e);
    }
  };

  const className = classNames("c-alert", {
    [`c-alert--${type}`]: types.some(t => t === type),
    "c-alert--has-title": title
  });

  if (closed) {
    return null;
  }

  return (
    <div role="alert" className={className}>
      {showIcon ? getStatusIcon(type) : null}
      <div className="c-alert__content">
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        {children}
      </div>
      {closable ? (
        <IconCloseBackwards
          role="button"
          aria-label="关闭"
          onClick={onCloseHandler}
        />
      ) : null}
    </div>
  );
};

Alert.propTypes = {
  type: PType,
  title: PText,
  children: PText.isRequired,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
  onClose: PropTypes.func
};

Alert.displayName = "Alert";
