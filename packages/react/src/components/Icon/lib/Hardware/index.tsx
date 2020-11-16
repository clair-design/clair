import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Hardware } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHardware = getStyleMergedComponent<IconProps>({
  template: Hardware
})(IconContainer);
