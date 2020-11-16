import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Hourglass } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHourglass = getStyleMergedComponent<IconProps>({
  template: Hourglass
})(IconContainer);
