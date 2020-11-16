import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Music } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMusic = getStyleMergedComponent<IconProps>({
  template: Music
})(IconContainer);
