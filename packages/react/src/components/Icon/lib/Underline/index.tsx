import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Underline } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUnderline = getStyleMergedComponent<IconProps>({
  template: Underline
})(IconContainer);
