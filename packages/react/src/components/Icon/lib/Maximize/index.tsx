import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Maximize } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMaximize = getStyleMergedComponent<IconProps>({
  template: Maximize
})(IconContainer);
