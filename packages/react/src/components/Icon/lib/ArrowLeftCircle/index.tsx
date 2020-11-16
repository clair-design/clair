import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ArrowLeftCircle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconArrowLeftCircle = getStyleMergedComponent<IconProps>({
  template: ArrowLeftCircle
})(IconContainer);
