import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Scan } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconScan = getStyleMergedComponent<IconProps>({
  template: Scan
})(IconContainer);
