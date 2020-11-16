import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Compass } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCompass = getStyleMergedComponent<IconProps>({
  template: Compass
})(IconContainer);
