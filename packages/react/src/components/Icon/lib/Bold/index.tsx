import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Bold } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBold = getStyleMergedComponent<IconProps>({
  template: Bold
})(IconContainer);
