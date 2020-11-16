import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Birth } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBirth = getStyleMergedComponent<IconProps>({
  template: Birth
})(IconContainer);
