import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Message } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMessage = getStyleMergedComponent<IconProps>({
  template: Message
})(IconContainer);
