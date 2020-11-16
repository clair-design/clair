import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Pentool } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPentool = getStyleMergedComponent<IconProps>({
  template: Pentool
})(IconContainer);
