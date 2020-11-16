import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Microphone } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMicrophone = getStyleMergedComponent<IconProps>({
  template: Microphone
})(IconContainer);
