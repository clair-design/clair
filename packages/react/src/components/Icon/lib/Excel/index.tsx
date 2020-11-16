import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Excel } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconExcel = getStyleMergedComponent<IconProps>({
  template: Excel
})(IconContainer);
