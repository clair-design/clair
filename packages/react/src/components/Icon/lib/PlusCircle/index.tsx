import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { PlusCircle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPlusCircle = getStyleMergedComponent<IconProps>({
  template: PlusCircle
})(IconContainer);
