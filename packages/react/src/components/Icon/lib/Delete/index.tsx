import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Delete } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDelete = getStyleMergedComponent<IconProps>({
  template: Delete
})(IconContainer);
