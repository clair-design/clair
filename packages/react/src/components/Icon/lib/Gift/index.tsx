import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Gift } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconGift = getStyleMergedComponent<IconProps>({
  template: Gift
})(IconContainer);
