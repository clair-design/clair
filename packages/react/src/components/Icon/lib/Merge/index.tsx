import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Merge } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMerge = getStyleMergedComponent<IconProps>({
  template: Merge
})(IconContainer);
