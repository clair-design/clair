import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Theme } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTheme = getStyleMergedComponent<IconProps>({
  template: Theme
})(IconContainer);
