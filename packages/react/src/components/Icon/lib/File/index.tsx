import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { File } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFile = getStyleMergedComponent<IconProps>({
  template: File
})(IconContainer);
