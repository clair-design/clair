import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Home } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHome = getStyleMergedComponent<IconProps>({
  template: Home
})(IconContainer);
