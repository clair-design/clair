import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Card } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCard = getStyleMergedComponent<IconProps>({
  template: Card
})(IconContainer);
