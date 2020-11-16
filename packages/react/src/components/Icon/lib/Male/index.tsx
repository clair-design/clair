import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Male } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMale = getStyleMergedComponent<IconProps>({
  template: Male
})(IconContainer);
