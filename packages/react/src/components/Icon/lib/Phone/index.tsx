import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Phone } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPhone = getStyleMergedComponent<IconProps>({
  template: Phone
})(IconContainer);
