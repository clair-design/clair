import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Tennis } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTennis = getStyleMergedComponent<IconProps>({
  template: Tennis
})(IconContainer);
