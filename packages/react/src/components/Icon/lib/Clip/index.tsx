import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Clip } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconClip = getStyleMergedComponent<IconProps>({
  template: Clip
})(IconContainer);
