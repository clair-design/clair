import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Flag } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFlag = getStyleMergedComponent<IconProps>({
  template: Flag
})(IconContainer);
