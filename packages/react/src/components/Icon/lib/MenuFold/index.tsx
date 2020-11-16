import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { MenuFold } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMenuFold = getStyleMergedComponent<IconProps>({
  template: MenuFold
})(IconContainer);
