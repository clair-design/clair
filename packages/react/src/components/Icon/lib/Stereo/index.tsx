import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Stereo } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconStereo = getStyleMergedComponent<IconProps>({
  template: Stereo
})(IconContainer);
