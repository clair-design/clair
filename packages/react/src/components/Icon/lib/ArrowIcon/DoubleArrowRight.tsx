import React from "react";
import { IconCommonProps, IconContainer } from "@components/Icon/lib/Container";
import { DoubleArrowRight } from "@clair/icons";

export const IconDoubleArrowRight: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={DoubleArrowRight} />;
};
