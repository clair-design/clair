import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Idea } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconIdea = getStyleMergedComponent<IconProps>({
  template: Idea
})(IconContainer);
