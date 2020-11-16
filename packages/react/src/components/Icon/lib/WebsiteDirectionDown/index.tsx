import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { WebsiteDirectionDown } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWebsiteDirectionDown = getStyleMergedComponent<IconProps>({
  template: WebsiteDirectionDown
})(IconContainer);
