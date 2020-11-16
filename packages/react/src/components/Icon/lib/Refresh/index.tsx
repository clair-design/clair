import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Refresh } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRefresh = getStyleMergedComponent<IconProps>({
  template: Refresh
})(IconContainer);
