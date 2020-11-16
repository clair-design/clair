import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Shuffle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconShuffle = getStyleMergedComponent<IconProps>({
  template: Shuffle
})(IconContainer);
