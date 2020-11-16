import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Mouse } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMouse = getStyleMergedComponent<IconProps>({
  template: Mouse
})(IconContainer);
