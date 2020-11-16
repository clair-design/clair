import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Bell } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBell = getStyleMergedComponent<IconProps>({
  template: Bell
})(IconContainer);
