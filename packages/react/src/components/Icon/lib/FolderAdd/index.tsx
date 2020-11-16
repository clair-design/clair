import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { FolderAdd } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFolderAdd = getStyleMergedComponent<IconProps>({
  template: FolderAdd
})(IconContainer);
