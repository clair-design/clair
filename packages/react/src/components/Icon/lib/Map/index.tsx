import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Map } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMap = getStyleMergedComponent<IconProps>({
  template: Map
})(IconContainer);
