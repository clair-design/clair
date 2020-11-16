import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Filter } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFilter = getStyleMergedComponent<IconProps>({
  template: Filter
})(IconContainer);
