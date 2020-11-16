import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Volume } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconVolume = getStyleMergedComponent<IconProps>({
  template: Volume
})(IconContainer);
