import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { FolderOpen } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFolderOpen = getStyleMergedComponent<IconProps>({
  template: FolderOpen
})(IconContainer);
