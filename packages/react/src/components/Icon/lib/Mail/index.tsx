import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Mail } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMail = getStyleMergedComponent<IconProps>({
  template: Mail
})(IconContainer);
