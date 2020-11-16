import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Weibo } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWeibo = getStyleMergedComponent<IconProps>({
  template: Weibo
})(IconContainer);
