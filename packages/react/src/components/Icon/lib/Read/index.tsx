import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Read } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRead = getStyleMergedComponent<IconProps>({
  template: Read
})(IconContainer);
