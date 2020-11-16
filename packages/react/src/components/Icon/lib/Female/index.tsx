import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Female } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFemale = getStyleMergedComponent<IconProps>({
  template: Female
})(IconContainer);
