import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { RotateCW } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRotateCW = getStyleMergedComponent<IconProps>({
  template: RotateCW
})(IconContainer);
