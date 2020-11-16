import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ArrowheadUp } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconArrowheadUp = getStyleMergedComponent<IconProps>({
  template: ArrowheadUp
})(IconContainer);
