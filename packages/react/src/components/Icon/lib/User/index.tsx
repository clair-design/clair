import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { User } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUser = getStyleMergedComponent<IconProps>({
  template: User
})(IconContainer);
