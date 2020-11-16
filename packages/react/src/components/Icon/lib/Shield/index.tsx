import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Shield } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconShield = getStyleMergedComponent<IconProps>({
  template: Shield
})(IconContainer);
