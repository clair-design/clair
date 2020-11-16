import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Camera } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCamera = getStyleMergedComponent<IconProps>({
  template: Camera
})(IconContainer);
