import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { DataExchange } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDataExchange = getStyleMergedComponent<IconProps>({
  template: DataExchange
})(IconContainer);
