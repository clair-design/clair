import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { FolderOpened } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFolderOpened = getStyleMergedComponent<IconProps>({
  template: FolderOpened
})(IconContainer);
