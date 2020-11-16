import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ToggleLeft } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconToggleLeft = getStyleMergedComponent<IconProps>({
  template: ToggleLeft
})(IconContainer);
