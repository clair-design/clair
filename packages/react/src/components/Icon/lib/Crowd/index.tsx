import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Crowd } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCrowd = getStyleMergedComponent<IconProps>({
  template: Crowd
})(IconContainer);
