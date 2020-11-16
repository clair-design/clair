import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Fridge } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFridge = getStyleMergedComponent<IconProps>({
  template: Fridge
})(IconContainer);
