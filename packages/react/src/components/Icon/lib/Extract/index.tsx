import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Extract } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconExtract = getStyleMergedComponent<IconProps>({
  template: Extract
})(IconContainer);
