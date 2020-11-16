import React from "react";
import { ArrowRight } from "@clair/icons";
import { IconContainer, IconCommonProps } from "../Container";

export const IconArrowRight: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={ArrowRight} />;
};
