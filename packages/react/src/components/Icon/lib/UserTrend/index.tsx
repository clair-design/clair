import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { UserTrend } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUserTrend = getStyleMergedComponent<IconProps>({
  template: UserTrend
})(IconContainer);
