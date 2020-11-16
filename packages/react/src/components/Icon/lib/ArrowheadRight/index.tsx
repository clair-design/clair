import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ArrowheadRight } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconArrowheadRight = getStyleMergedComponent<IconProps>({
  template: ArrowheadRight
})(IconContainer);
