import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Battery } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBattery = getStyleMergedComponent<IconProps>({
  template: Battery
})(IconContainer);
