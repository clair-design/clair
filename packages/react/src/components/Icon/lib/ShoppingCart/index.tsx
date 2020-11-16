import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ShoppingCart } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconShoppingCart = getStyleMergedComponent<IconProps>({
  template: ShoppingCart
})(IconContainer);
