import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Website } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWebsite = getStyleMergedComponent<IconProps>({
  template: Website
})(IconContainer);
