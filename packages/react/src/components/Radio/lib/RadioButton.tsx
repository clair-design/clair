import React from "react";
import classnames from "classnames";

import { Radio, RadioProps } from "./Radio";

export type RadioButtonProps = RadioProps;
export const RadioButton: React.FC<RadioProps> = props => {
  const { className, children, ...rest } = props;
  return (
    <Radio {...rest} className={classnames(className, "c-radio--button")}>
      {children}
    </Radio>
  );
};

RadioButton.propTypes = Radio.propTypes;
RadioButton.displayName = "RadioButton";
