import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Select } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSelect = getStyleMergedComponent<IconProps>({
  template: Select
})(IconContainer);
