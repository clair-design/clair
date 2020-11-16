import React from "react";
import { IconCommonProps, IconContainer } from "@components/Icon/lib/Container";
import { DoubleArrowLeft } from "@clair/icons";

export const IconDoubleArrowLeft: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={DoubleArrowLeft} />;
};
