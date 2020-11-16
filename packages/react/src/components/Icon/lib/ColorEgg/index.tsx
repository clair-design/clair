import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ColorEgg } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconColorEgg = getStyleMergedComponent<IconProps>({
  template: ColorEgg
})(IconContainer);
