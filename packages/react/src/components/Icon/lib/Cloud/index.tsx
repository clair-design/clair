import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Cloud } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCloud = getStyleMergedComponent<IconProps>({
  template: Cloud
})(IconContainer);
