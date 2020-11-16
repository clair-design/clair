import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Smile } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSmile = getStyleMergedComponent<IconProps>({
  template: Smile
})(IconContainer);
