import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { DataTrends } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDataTrends = getStyleMergedComponent<IconProps>({
  template: DataTrends
})(IconContainer);
