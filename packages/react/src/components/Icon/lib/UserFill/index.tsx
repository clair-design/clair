import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { UserFill } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUserFill = getStyleMergedComponent<IconProps>({
  template: UserFill
})(IconContainer);
