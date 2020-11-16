import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Repeat } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRepeat = getStyleMergedComponent<IconProps>({
  template: Repeat
})(IconContainer);
