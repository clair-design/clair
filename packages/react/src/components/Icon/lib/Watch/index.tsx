import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Watch } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWatch = getStyleMergedComponent<IconProps>({
  template: Watch
})(IconContainer);
