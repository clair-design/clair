import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { WebsiteSearch } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconWebsiteSearch = getStyleMergedComponent<IconProps>({
  template: WebsiteSearch
})(IconContainer);
