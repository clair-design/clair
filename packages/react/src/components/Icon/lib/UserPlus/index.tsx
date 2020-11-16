import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { UserPlus } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUserPlus = getStyleMergedComponent<IconProps>({
  template: UserPlus
})(IconContainer);
