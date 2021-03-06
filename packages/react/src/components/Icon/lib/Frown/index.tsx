import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Frown } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFrown = getStyleMergedComponent<IconProps>({
  template: Frown
})(IconContainer);
