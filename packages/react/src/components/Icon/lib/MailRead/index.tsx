import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { MailRead } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMailRead = getStyleMergedComponent<IconProps>({
  template: MailRead
})(IconContainer);
