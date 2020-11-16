import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Send } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSend = getStyleMergedComponent<IconProps>({
  template: Send
})(IconContainer);
