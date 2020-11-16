import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Package } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPackage = getStyleMergedComponent<IconProps>({
  template: Package
})(IconContainer);
