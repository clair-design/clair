import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ArrowheadDown } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconArrowheadDown = getStyleMergedComponent<IconProps>({
  template: ArrowheadDown
})(IconContainer);
