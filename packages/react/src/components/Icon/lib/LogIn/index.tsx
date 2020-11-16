import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { LogIn } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLogIn = getStyleMergedComponent<IconProps>({
  template: LogIn
})(IconContainer);
