import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Save } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSave = getStyleMergedComponent<IconProps>({
  template: Save
})(IconContainer);
