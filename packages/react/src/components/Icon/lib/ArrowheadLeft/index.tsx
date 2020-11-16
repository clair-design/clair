import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ArrowheadLeft } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconArrowheadLeft = getStyleMergedComponent<IconProps>({
  template: ArrowheadLeft
})(IconContainer);
