import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Rocket } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRocket = getStyleMergedComponent<IconProps>({
  template: Rocket
})(IconContainer);
