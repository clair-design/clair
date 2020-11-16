import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { CaretDown } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCaretDown = getStyleMergedComponent<IconProps>({
  template: CaretDown
})(IconContainer);
