import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Italic } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconItalic = getStyleMergedComponent<IconProps>({
  template: Italic
})(IconContainer);
