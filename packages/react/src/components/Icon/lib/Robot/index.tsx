import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Robot } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRobot = getStyleMergedComponent<IconProps>({
  template: Robot
})(IconContainer);
