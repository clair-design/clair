import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Minimize } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMinimize = getStyleMergedComponent<IconProps>({
  template: Minimize
})(IconContainer);
