import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Goods } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconGoods = getStyleMergedComponent<IconProps>({
  template: Goods
})(IconContainer);
