import React, { useCallback, SyntheticEvent, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { FormProps, FormRefParams, FormContextType } from "./type";
import { useForm } from "./Base";

type OptionalFormContextType = Partial<FormContextType>;
export const FormContext = React.createContext<OptionalFormContextType>({});

export const Form = React.forwardRef<FormRefParams, FormProps>(
  (props, formRef) => {
    const {
      inline,
      labelPosition = "right",
      labelWidth,
      children,
      style,
      className,
      onSubmit,
      defaultValue
    } = props;
    const form = useForm(defaultValue);
    const ref4Context = useRef<FormRefParams>(form);

    if (formRef) {
      if (typeof formRef === "function") {
        formRef(form);
      } else {
        (formRef as React.MutableRefObject<FormRefParams>).current = form;
        ref4Context.current = form;
      }
    }

    const contextValue = {
      formRef: ref4Context,
      labelWidth
    };

    const handleSubmit = useCallback(
      (e: SyntheticEvent) => {
        e.preventDefault();

        form.validate().then(valiList => {
          const isValid = !valiList.some(({ isValid }) => !isValid);

          if (typeof onSubmit === "function") {
            onSubmit(isValid, form.getValue());
          }
        });
      },
      [form, onSubmit]
    );

    return (
      <FormContext.Provider value={contextValue}>
        <form
          className={classNames("c-form", className, {
            [`c-form--label-${labelPosition}`]: labelPosition,
            "c-form--inline": inline
          })}
          style={style}
          onSubmit={handleSubmit}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";
Form.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  inline: PropTypes.bool,
  labelPosition: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.object
};
