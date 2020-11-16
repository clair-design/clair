import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Edit } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconEdit = getStyleMergedComponent<IconProps>({
  template: Edit
})(IconContainer);
