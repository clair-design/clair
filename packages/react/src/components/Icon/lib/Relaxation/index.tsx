import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Relaxation } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconRelaxation = getStyleMergedComponent<IconProps>({
  template: Relaxation
})(IconContainer);
