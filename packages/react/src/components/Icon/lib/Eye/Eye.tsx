import React from "react";
import { IconCommonProps, IconContainer } from "@components/Icon/lib/Container";
import { Eye } from "@clair/icons";

export const IconEye: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={Eye} />;
};
