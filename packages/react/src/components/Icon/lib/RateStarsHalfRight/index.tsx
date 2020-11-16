import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { RateStarsHalfRight } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRateStarsHalfRight = getStyleMergedComponent<IconProps>({
  template: RateStarsHalfRight
})(IconContainer);
