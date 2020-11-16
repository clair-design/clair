import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { List } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconList = getStyleMergedComponent<IconProps>({
  template: List
})(IconContainer);
