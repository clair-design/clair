import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Power } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPower = getStyleMergedComponent<IconProps>({
  template: Power
})(IconContainer);
