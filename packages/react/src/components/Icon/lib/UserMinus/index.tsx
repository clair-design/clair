import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { UserMinus } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUserMinus = getStyleMergedComponent<IconProps>({
  template: UserMinus
})(IconContainer);
