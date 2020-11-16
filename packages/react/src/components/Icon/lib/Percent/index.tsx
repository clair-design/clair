import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Percent } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPercent = getStyleMergedComponent<IconProps>({
  template: Percent
})(IconContainer);
