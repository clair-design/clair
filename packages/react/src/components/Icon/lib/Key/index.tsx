import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Key } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconKey = getStyleMergedComponent<IconProps>({
  template: Key
})(IconContainer);
