import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { RotateCCW } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRotateCCW = getStyleMergedComponent<IconProps>({
  template: RotateCCW
})(IconContainer);
