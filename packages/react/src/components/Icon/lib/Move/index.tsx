import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Move } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMove = getStyleMergedComponent<IconProps>({
  template: Move
})(IconContainer);
