import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { CaretUp } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCaretUp = getStyleMergedComponent<IconProps>({
  template: CaretUp
})(IconContainer);
