import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Mute } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMute = getStyleMergedComponent<IconProps>({
  template: Mute
})(IconContainer);
