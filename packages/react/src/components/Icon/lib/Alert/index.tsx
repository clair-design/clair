import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Alert } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconAlert = getStyleMergedComponent<IconProps>({
  template: Alert
})(IconContainer);
