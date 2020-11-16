import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { StarFilled } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconStarFilled = getStyleMergedComponent<IconProps>({
  template: StarFilled
})(IconContainer);
