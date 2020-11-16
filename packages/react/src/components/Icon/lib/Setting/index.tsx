import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Setting } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSetting = getStyleMergedComponent<IconProps>({
  template: Setting
})(IconContainer);
