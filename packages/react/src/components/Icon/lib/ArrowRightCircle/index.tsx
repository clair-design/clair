import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ArrowRightCircle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconArrowRightCircle = getStyleMergedComponent<IconProps>({
  template: ArrowRightCircle
})(IconContainer);
