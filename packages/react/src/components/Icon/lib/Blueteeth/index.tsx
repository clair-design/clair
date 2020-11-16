import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Blueteeth } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBlueteeth = getStyleMergedComponent<IconProps>({
  template: Blueteeth
})(IconContainer);
