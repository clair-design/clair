import React from "react";
import { IconCommonProps, IconContainer } from "@components/Icon/lib/Container";
import { EyeClosed } from "@clair/icons";

export const IconEyeClosed: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={EyeClosed} />;
};
