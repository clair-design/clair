import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { DataBaseline } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDataBaseline = getStyleMergedComponent<IconProps>({
  template: DataBaseline
})(IconContainer);
