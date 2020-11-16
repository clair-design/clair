import React from "react";
import {
  Exclamation,
  ExclamationCircleFill,
  ExclamationCircle
} from "@clair/icons";
import { IconProps, IconPropTypes, IconContainer } from "../Container";
import { IconLineAndDot } from "../IconLineAndDot";
import { getStyleMergedComponent } from "@src/utils";

export const IconExclamation: React.FC<IconProps> = props => {
  return <IconLineAndDot {...props} template={Exclamation} />;
};

IconExclamation.propTypes = IconPropTypes;
IconExclamation.displayName = "IconExclamation";

export const IconExclamationCircleFill = getStyleMergedComponent<IconProps>({
  template: ExclamationCircleFill,
  className: "c-icon--fill"
})(IconContainer);

export const IconExclamationCircle = getStyleMergedComponent<IconProps>({
  template: ExclamationCircle
})(IconContainer);
