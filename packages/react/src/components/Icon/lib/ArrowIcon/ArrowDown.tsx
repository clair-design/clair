import React from "react";
import { ArrowDown } from "@clair/icons";
import { IconContainer, IconCommonProps } from "../Container";

export const IconArrowDown: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={ArrowDown} />;
};
