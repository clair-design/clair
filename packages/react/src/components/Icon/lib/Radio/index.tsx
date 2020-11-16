import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Radio } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRadio = getStyleMergedComponent<IconProps>({
  template: Radio
})(IconContainer);
