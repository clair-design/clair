import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { RenderOption, OptionProps } from "./Option";
export interface OptionGroupProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export const OptionGroup: React.FC<OptionGroupProps> = () => null;

OptionGroup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

OptionGroup.displayName = "OptionGroup";

export interface RenderOptionGroupProps extends OptionGroupProps {
  options: Array<OptionProps>;
}

export const RenderOptionGroup: React.FC<RenderOptionGroupProps> = (
  props: RenderOptionGroupProps
) => {
  const { options, title, className } = props;
  const optionClassName = classNames("c-select__option-group", className);
  return (
    <div className={optionClassName}>
      <div className="c-select__option-group__title">{title}</div>
      {options.map(option => (
        <RenderOption optionProps={option} key={option.value} />
      ))}
    </div>
  );
};

RenderOptionGroup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  children: PropTypes.node
};
RenderOptionGroup.displayName = "OptionGroup";
