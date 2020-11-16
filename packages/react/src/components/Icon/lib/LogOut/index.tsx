import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { LogOut } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLogOut = getStyleMergedComponent<IconProps>({
  template: LogOut
})(IconContainer);
