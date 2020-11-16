import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { FileFilled } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFileFilled = getStyleMergedComponent<IconProps>({
  template: FileFilled
})(IconContainer);
