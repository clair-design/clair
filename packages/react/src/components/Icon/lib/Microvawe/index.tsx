import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Microvawe } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMicrovawe = getStyleMergedComponent<IconProps>({
  template: Microvawe
})(IconContainer);
