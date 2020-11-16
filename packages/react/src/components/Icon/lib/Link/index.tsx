import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Link } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLink = getStyleMergedComponent<IconProps>({
  template: Link
})(IconContainer);
