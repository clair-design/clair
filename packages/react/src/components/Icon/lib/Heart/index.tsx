import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Heart } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHeart = getStyleMergedComponent<IconProps>({
  template: Heart
})(IconContainer);
