import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Clock } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconClock = getStyleMergedComponent<IconProps>({
  template: Clock
})(IconContainer);
