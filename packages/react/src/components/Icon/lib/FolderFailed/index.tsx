import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { FolderFailed } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFolderFailed = getStyleMergedComponent<IconProps>({
  template: FolderFailed
})(IconContainer);
