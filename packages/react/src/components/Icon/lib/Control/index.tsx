import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Control } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconControl = getStyleMergedComponent<IconProps>({
  template: Control
})(IconContainer);
