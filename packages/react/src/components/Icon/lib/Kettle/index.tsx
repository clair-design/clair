import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Kettle } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconKettle = getStyleMergedComponent<IconProps>({
  template: Kettle
})(IconContainer);
