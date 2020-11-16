import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Car } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCar = getStyleMergedComponent<IconProps>({
  template: Car
})(IconContainer);
