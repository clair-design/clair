import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Coffee } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCoffee = getStyleMergedComponent<IconProps>({
  template: Coffee
})(IconContainer);
