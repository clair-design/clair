import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Caculator } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCaculator = getStyleMergedComponent<IconProps>({
  template: Caculator
})(IconContainer);
