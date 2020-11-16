import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { UserCheck } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUserCheck = getStyleMergedComponent<IconProps>({
  template: UserCheck
})(IconContainer);
