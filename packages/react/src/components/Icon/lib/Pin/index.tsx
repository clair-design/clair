import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Pin } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPin = getStyleMergedComponent<IconProps>({
  template: Pin
})(IconContainer);
