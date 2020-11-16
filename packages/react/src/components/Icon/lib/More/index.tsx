import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { More } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMore = getStyleMergedComponent<IconProps>({
  template: More
})(IconContainer);
