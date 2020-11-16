import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Shake } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconShake = getStyleMergedComponent<IconProps>({
  template: Shake
})(IconContainer);
