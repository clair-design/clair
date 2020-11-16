import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { MenuUnfold } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMenuUnfold = getStyleMergedComponent<IconProps>({
  template: MenuUnfold
})(IconContainer);
