import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { LineChart } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLineChart = getStyleMergedComponent<IconProps>({
  template: LineChart
})(IconContainer);
