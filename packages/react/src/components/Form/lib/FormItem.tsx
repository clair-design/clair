import React, { useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { FormContext } from "./Form";

import { Controller, useFieldState } from "./Base";

import { isRulesRequired } from "./utils";

import { FormItemProps, FormContextType } from "./type";

function renderLabel(label?: string, width?: number | string) {
  if (!label) return;

  return (
    <label className="c-form-item__label" style={{ width }}>
      {label}
    </label>
  );
}

function renderHelperText(helperText?: string) {
  if (!helperText) return;

  return <div className="c-form-item__helper-text">{helperText}</div>;
}

function renderErrorMessage(message?: string) {
  if (!message) return;

  return <div className="c-form-item__error">{message}</div>;
}

export const FormItem = (props: FormItemProps) => {
  const { helperText, name, label, rules, labelWidth, ...propsForCpn } = props;

  const { formRef, labelWidth: contextLabelWidth } = useContext(
    FormContext
  ) as FormContextType;
  const { isValidating, message, isValid } = useFieldState(formRef, name);

  const width = "labelWidth" in props ? labelWidth : contextLabelWidth;
  const hasHelperText = helperText || message;

  const Field = React.createElement(
    Controller,
    Object.assign(propsForCpn, {
      name,
      rules,
      control: formRef.current.control
    })
  );

  return (
    <div
      className={classNames("c-form-item", {
        "c-form-item--with-help": hasHelperText,
        "is-error": !isValid,
        "is-validating": isValidating,
        "is-required": isRulesRequired(rules)
      })}
    >
      {renderLabel(label, width)}
      <div className="c-form-item__content">
        <div className="c-form-item__wrapper">{Field}</div>
        {renderHelperText(helperText)}
        {renderErrorMessage(message)}
      </div>
    </div>
  );
};

FormItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.node,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helperText: PropTypes.node,
  rules: PropTypes.array,
  name: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element]).isRequired
};
