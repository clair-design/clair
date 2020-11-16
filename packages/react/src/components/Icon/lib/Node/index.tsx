import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Node } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconNode = getStyleMergedComponent<IconProps>({
  template: Node
})(IconContainer);
