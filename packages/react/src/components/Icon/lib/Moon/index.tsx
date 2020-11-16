import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Moon } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMoon = getStyleMergedComponent<IconProps>({
  template: Moon
})(IconContainer);
