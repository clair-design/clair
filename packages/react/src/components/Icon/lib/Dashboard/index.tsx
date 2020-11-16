import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Dashboard } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDashboard = getStyleMergedComponent<IconProps>({
  template: Dashboard
})(IconContainer);
