import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { MenuNav1 } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMenuNav1 = getStyleMergedComponent<IconProps>({
  template: MenuNav1
})(IconContainer);
