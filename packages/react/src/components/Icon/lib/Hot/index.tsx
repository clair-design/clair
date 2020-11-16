import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Hot } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHot = getStyleMergedComponent<IconProps>({
  template: Hot
})(IconContainer);
