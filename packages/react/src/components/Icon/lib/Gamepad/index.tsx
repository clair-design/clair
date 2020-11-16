import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Gamepad } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconGamepad = getStyleMergedComponent<IconProps>({
  template: Gamepad
})(IconContainer);
