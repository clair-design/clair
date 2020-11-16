import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Book } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBook = getStyleMergedComponent<IconProps>({
  template: Book
})(IconContainer);
