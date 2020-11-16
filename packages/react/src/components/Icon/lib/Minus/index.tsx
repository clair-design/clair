import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Minus } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMinus = getStyleMergedComponent<IconProps>({
  template: Minus
})(IconContainer);
