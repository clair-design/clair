import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { FileGroup } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFileGroup = getStyleMergedComponent<IconProps>({
  template: FileGroup
})(IconContainer);
