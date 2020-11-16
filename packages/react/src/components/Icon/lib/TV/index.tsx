import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { TV } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTV = getStyleMergedComponent<IconProps>({
  template: TV
})(IconContainer);
