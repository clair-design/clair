import React from "react";
import { IconCommonProps, IconContainer } from "@components/Icon/lib/Container";
import { Search } from "@clair/icons";

export const IconSearch: React.FC<IconCommonProps> = props => {
  return <IconContainer {...props} template={Search} />;
};
