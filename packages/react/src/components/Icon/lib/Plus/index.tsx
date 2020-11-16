import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Plus } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPlus = getStyleMergedComponent<IconProps>({
  template: Plus
})(IconContainer);
