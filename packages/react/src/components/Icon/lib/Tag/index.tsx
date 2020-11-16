import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Tag } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTag = getStyleMergedComponent<IconProps>({
  template: Tag
})(IconContainer);
