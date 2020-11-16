import React from "react";
import { ArrowUp } from "@clair/icons";
import { IconContainer, IconCommonProps } from "../Container";

export const IconArrowUp: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={ArrowUp} />;
};
