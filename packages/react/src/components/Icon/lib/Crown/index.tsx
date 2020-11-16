import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Crown } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCrown = getStyleMergedComponent<IconProps>({
  template: Crown
})(IconContainer);
