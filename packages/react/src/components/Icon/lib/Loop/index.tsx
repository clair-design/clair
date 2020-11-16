import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Loop } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLoop = getStyleMergedComponent<IconProps>({
  template: Loop
})(IconContainer);
