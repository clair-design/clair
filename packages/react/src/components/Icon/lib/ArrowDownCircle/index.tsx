import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ArrowDownCircle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconArrowDownCircle = getStyleMergedComponent<IconProps>({
  template: ArrowDownCircle
})(IconContainer);
