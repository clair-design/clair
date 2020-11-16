import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { WeChat } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWeChat = getStyleMergedComponent<IconProps>({
  template: WeChat
})(IconContainer);
