import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Player } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPlayer = getStyleMergedComponent<IconProps>({
  template: Player
})(IconContainer);
