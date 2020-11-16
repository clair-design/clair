import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Codepen } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCodepen = getStyleMergedComponent<IconProps>({
  template: Codepen
})(IconContainer);
