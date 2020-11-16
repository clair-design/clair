import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { DataTrend } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDataTrend = getStyleMergedComponent<IconProps>({
  template: DataTrend
})(IconContainer);
