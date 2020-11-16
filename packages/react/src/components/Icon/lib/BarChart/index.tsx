import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { BarChart } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBarChart = getStyleMergedComponent<IconProps>({
  template: BarChart
})(IconContainer);
