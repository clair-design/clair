import React from "react";
import { Info, InfoCircleFill, InfoCircle } from "@clair/icons";
import { IconProps, IconPropTypes, IconContainer } from "../Container";
import { IconLineAndDot } from "../IconLineAndDot";
import { getStyleMergedComponent } from "@src/utils";

export const IconInfo: React.FC<IconProps> = props => {
  return <IconLineAndDot {...props} template={Info} />;
};
IconInfo.displayName = "IconInfo";
IconInfo.propTypes = IconPropTypes;

export const IconInfoCircleFill = getStyleMergedComponent<IconProps>({
  template: InfoCircleFill,
  className: "c-icon--fill"
})(IconContainer);

export const IconInfoCircle = getStyleMergedComponent<IconProps>({
  template: InfoCircle
})(IconContainer);
