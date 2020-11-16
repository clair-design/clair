import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { CardPackage } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCardPackage = getStyleMergedComponent<IconProps>({
  template: CardPackage
})(IconContainer);
