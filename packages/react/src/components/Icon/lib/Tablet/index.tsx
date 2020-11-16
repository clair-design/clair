import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Tablet } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTablet = getStyleMergedComponent<IconProps>({
  template: Tablet
})(IconContainer);
