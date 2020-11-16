import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { History } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHistory = getStyleMergedComponent<IconProps>({
  template: History
})(IconContainer);
