import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { UserX } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUserX = getStyleMergedComponent<IconProps>({
  template: UserX
})(IconContainer);
