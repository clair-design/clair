import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Location } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLocation = getStyleMergedComponent<IconProps>({
  template: Location
})(IconContainer);
