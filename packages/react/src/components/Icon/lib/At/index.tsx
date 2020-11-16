import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { At } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconAt = getStyleMergedComponent<IconProps>({
  template: At
})(IconContainer);
