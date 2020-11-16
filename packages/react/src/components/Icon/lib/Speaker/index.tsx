import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Speaker } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSpeaker = getStyleMergedComponent<IconProps>({
  template: Speaker
})(IconContainer);
