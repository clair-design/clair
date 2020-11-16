import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TooltipCore, propTypes } from "./lib/TooltipCore";
import { TooltipCoreProps as TooltipProps } from "./lib/types/tooltip";

export const Tooltip: React.FC<TooltipProps> = props => {
  return (
    <TooltipCore
      {...props}
      className={classNames("c-tooltip", props.className)}
    >
      {props.children}
    </TooltipCore>
  );
};

Tooltip.propTypes = { ...propTypes } as PropTypes.ValidationMap<TooltipProps>;
Tooltip.displayName = "Tooltip";
