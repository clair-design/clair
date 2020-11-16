import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { CaretRight } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCaretRight = getStyleMergedComponent<IconProps>({
  template: CaretRight
})(IconContainer);
