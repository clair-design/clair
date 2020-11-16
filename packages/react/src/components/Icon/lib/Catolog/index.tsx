import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Catolog } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCatolog = getStyleMergedComponent<IconProps>({
  template: Catolog
})(IconContainer);
