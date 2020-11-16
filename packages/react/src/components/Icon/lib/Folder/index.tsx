import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Folder } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFolder = getStyleMergedComponent<IconProps>({
  template: Folder
})(IconContainer);
