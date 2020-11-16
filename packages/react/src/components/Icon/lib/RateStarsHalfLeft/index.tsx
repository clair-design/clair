import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { RateStarsHalfLeft } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRateStarsHalfLeft = getStyleMergedComponent<IconProps>({
  template: RateStarsHalfLeft
})(IconContainer);
