import React from "react";
import { ArrowLeft } from "@clair/icons";
import { IconContainer, IconCommonProps } from "../Container";

export const IconArrowLeft: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={ArrowLeft} />;
};
