import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { WebsiteDirectionUp } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWebsiteDirectionUp = getStyleMergedComponent<IconProps>({
  template: WebsiteDirectionUp
})(IconContainer);
