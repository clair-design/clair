import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { News } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconNews = getStyleMergedComponent<IconProps>({
  template: News
})(IconContainer);
