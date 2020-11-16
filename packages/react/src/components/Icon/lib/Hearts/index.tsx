import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Hearts } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHearts = getStyleMergedComponent<IconProps>({
  template: Hearts
})(IconContainer);
