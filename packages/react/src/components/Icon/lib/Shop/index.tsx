import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Shop } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconShop = getStyleMergedComponent<IconProps>({
  template: Shop
})(IconContainer);
