import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { MenuNav2 } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMenuNav2 = getStyleMergedComponent<IconProps>({
  template: MenuNav2
})(IconContainer);
