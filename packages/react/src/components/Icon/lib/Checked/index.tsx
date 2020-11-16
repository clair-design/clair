import { getStyleMergedComponent } from "@src/utils";
import { IconProps, IconContainer } from "../Container";
import { Checked, CheckedCircleFill, CheckedCircle } from "@clair/icons";

export const IconChecked = getStyleMergedComponent<IconProps>({
  template: Checked
})(IconContainer);

export const IconCheckedCircleFill = getStyleMergedComponent<IconProps>({
  template: CheckedCircleFill,
  className: "c-icon--fill"
})(IconContainer);

export const IconCheckedCircle = getStyleMergedComponent<IconProps>({
  template: CheckedCircle
})(IconContainer);
