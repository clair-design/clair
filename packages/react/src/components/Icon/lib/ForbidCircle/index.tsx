import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { ForbidCircle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconForbidCircle = getStyleMergedComponent<IconProps>({
  template: ForbidCircle
})(IconContainer);
