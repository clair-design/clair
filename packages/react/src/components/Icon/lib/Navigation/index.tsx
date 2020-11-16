import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Navigation } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconNavigation = getStyleMergedComponent<IconProps>({
  template: Navigation
})(IconContainer);
