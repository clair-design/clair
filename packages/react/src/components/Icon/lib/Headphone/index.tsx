import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Headphone } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHeadphone = getStyleMergedComponent<IconProps>({
  template: Headphone
})(IconContainer);
