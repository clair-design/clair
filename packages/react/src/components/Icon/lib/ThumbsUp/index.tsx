import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ThumbsUp } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconThumbsUp = getStyleMergedComponent<IconProps>({
  template: ThumbsUp
})(IconContainer);
