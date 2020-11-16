import React from "react";
import { InputProps } from "./types";
import PropTypes from "prop-types";

interface InputGroupProps {
  prefix?: InputProps["prefix"];
  suffix?: InputProps["suffix"];
  children: React.ReactNode;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  prefix,
  suffix,
  children
}) => (
  <div className="c-input-group">
    {prefix}
    {children}
    {suffix}
  </div>
);

InputGroup.propTypes = {
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  children: PropTypes.node.isRequired
};
