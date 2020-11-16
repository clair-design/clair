import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Lock } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLock = getStyleMergedComponent<IconProps>({
  template: Lock
})(IconContainer);
