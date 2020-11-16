import classNames from "classnames";
import React, { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SelectContext from "./SelectContext";

export interface OptionProps {
  className?: string;
  disabled?: boolean;
  value: string | number;
  label?: string;
  children?: React.ReactNode;
}
const scrollIntoView = (optionElement: Element) => {
  // @test: use `?.` to pass test
  optionElement.scrollIntoView?.({
    block: "nearest"
  });
};
export const Option: React.FC<OptionProps> = () => null;

Option.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  children: PropTypes.node
};

Option.displayName = "Option";
interface RenderOptionProps {
  optionProps: OptionProps;
}
export const RenderOption: React.FC<RenderOptionProps> = props => {
  const { optionProps } = props;
  const { label, className, disabled, children, value } = optionProps;
  const {
    selectedOptions,
    activeOption,
    handleChange,
    updateActiveOption,
    forwardRef
  } = useContext(SelectContext);
  const optionRef = useRef<HTMLDivElement>(null);
  const isSelected = selectedOptions.some(
    optionPropsItem => optionPropsItem.value === optionProps.value
  );
  const isActive = activeOption?.value === optionProps.value;
  const optionClassName = classNames("c-select__option", className, {
    "c-select__option--selected": !disabled && isSelected,
    "c-select__option--disabled": disabled,
    "c-select__option--active": !disabled && isActive
  });
  useEffect(() => {
    if (!isActive || disabled) return;
    if (optionRef.current && forwardRef?.current) {
      scrollIntoView(optionRef.current);
    }
  }, [disabled, forwardRef, isActive]);
  const handleChangeProxy = (optionProps: OptionProps) => {
    if (disabled) return;
    handleChange(optionProps);
  };
  const updateActiveOptionProxy = (optionProps: OptionProps) => {
    if (disabled) return;
    updateActiveOption(optionProps);
  };
  return (
    <div
      ref={optionRef}
      key={value}
      className={optionClassName}
      role="option"
      aria-selected={isSelected}
      onClick={() => handleChangeProxy(optionProps)}
      onMouseEnter={() => updateActiveOptionProxy(optionProps)}
      tabIndex={-1}
      onKeyDown={() => void 0}
    >
      {children || label}
    </div>
  );
};

RenderOption.propTypes = {
  optionProps: PropTypes.shape(Option.propTypes) as PropTypes.InferType<
    RenderOptionProps["optionProps"]
  >
};

RenderOption.displayName = "Option";
