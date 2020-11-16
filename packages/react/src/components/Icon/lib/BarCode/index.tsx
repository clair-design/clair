import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { BarCode } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBarCode = getStyleMergedComponent<IconProps>({
  template: BarCode
})(IconContainer);
