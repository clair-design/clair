import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Wifi } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWifi = getStyleMergedComponent<IconProps>({
  template: Wifi
})(IconContainer);
