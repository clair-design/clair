import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Airplane } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconAirplane = getStyleMergedComponent<IconProps>({
  template: Airplane
})(IconContainer);
