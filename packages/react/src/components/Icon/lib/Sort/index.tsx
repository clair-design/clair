import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Sort } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSort = getStyleMergedComponent<IconProps>({
  template: Sort
})(IconContainer);
