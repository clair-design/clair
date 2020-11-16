import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ValueMap } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconValueMap = getStyleMergedComponent<IconProps>({
  template: ValueMap
})(IconContainer);
