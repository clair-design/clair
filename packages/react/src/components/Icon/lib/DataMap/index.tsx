import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { DataMap } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDataMap = getStyleMergedComponent<IconProps>({
  template: DataMap
})(IconContainer);
