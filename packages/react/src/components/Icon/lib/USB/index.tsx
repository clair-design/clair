import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { USB } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUSB = getStyleMergedComponent<IconProps>({
  template: USB
})(IconContainer);
