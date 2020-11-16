import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Bank } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBank = getStyleMergedComponent<IconProps>({
  template: Bank
})(IconContainer);
