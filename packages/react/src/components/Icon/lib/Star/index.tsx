import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Star } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconStar = getStyleMergedComponent<IconProps>({
  template: Star
})(IconContainer);
