import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Forward } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconForward = getStyleMergedComponent<IconProps>({
  template: Forward
})(IconContainer);
