import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ToggleRight } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconToggleRight = getStyleMergedComponent<IconProps>({
  template: ToggleRight
})(IconContainer);
