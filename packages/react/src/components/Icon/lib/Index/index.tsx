import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Index } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconIndex = getStyleMergedComponent<IconProps>({
  template: Index
})(IconContainer);
