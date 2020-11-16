import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Computer } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconComputer = getStyleMergedComponent<IconProps>({
  template: Computer
})(IconContainer);
