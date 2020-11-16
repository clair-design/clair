import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Mobile } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMobile = getStyleMergedComponent<IconProps>({
  template: Mobile
})(IconContainer);
