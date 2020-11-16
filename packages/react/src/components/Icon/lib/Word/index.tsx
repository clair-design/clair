import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Word } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWord = getStyleMergedComponent<IconProps>({
  template: Word
})(IconContainer);
