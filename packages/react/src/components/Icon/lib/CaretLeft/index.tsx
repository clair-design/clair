import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { CaretLeft } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCaretLeft = getStyleMergedComponent<IconProps>({
  template: CaretLeft
})(IconContainer);
