import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Crop } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCrop = getStyleMergedComponent<IconProps>({
  template: Crop
})(IconContainer);
