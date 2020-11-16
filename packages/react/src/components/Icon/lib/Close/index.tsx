import * as React from "react";
import { Close, CloseCircleFill, CloseCircle } from "@clair/icons";
import { IconContainer, IconProps } from "../Container";
import { getStyleMergedComponent } from "@src/utils";

export const IconClose: React.FC<IconProps> = props => {
  return <IconContainer {...props} template={Close} />;
};

export const IconCloseCircleFill = getStyleMergedComponent<IconProps>({
  template: CloseCircleFill,
  className: "c-icon--fill"
})(IconContainer);

export const IconCloseCircle = getStyleMergedComponent<IconProps>({
  template: CloseCircle
})(IconContainer);

export const IconCloseBackwards = getStyleMergedComponent({
  className: "c-icon--close"
})(IconClose);
