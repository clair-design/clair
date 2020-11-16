import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Notebook } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconNotebook = getStyleMergedComponent<IconProps>({
  template: Notebook
})(IconContainer);
