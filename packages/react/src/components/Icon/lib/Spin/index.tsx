import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Spin } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSpin = getStyleMergedComponent<IconProps>({
  template: Spin,
  className: "c-icon--spin"
})(IconContainer);
