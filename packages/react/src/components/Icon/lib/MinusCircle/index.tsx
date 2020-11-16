import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { MinusCircle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMinusCircle = getStyleMergedComponent<IconProps>({
  template: MinusCircle
})(IconContainer);
