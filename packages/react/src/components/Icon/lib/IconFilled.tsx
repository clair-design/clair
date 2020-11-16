import { getStyleMergedComponent } from "@src/utils";
import { IconContainer, IconProps } from "./Container";

export const IconFilled = getStyleMergedComponent<IconProps>({
  className: "c-icon--svg-fill"
})(IconContainer);

IconFilled.displayName = "IconFilled";
