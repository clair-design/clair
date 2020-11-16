import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Champion } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconChampion = getStyleMergedComponent<IconProps>({
  template: Champion
})(IconContainer);
