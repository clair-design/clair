import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Target } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTarget = getStyleMergedComponent<IconProps>({
  template: Target
})(IconContainer);
